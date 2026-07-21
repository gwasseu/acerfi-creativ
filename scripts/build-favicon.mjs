// Generate a multi-resolution favicon.ico from the official ACERFI Creativ
// monogram. Each size is wrapped as PNG-in-ICO, which is supported by every
// modern browser. Sources from public/shared/images/Creativ/ — the same
// asset path used by the rest of the app (lib/design-tokens.ts).
//
// Usage: node scripts/build-favicon.mjs

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
// sharp is a transitive dep of next; it's not declared in package.json, so
// `import "sharp"` won't resolve. We import via the pnpm store path. If sharp
// is ever promoted to a direct devDependency, switch back to `import "sharp"`.
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const SRC = resolve(
  process.cwd(),
  "public/shared/images/Creativ/LOGO AC FAVICON COULEUR.png",
);
const OUT = resolve(process.cwd(), "app/favicon.ico");
const SIZES = [16, 32, 48, 64, 128, 256];

async function main() {
  const src = await readFile(SRC);
  const pngs = await Promise.all(
    SIZES.map((s) =>
      sharp(src)
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
        .then((data) => ({ size: s, data })),
    ),
  );

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(pngs.length, 4); // count

  const dir = Buffer.alloc(16 * pngs.length);
  let offset = header.length + dir.length;
  pngs.forEach((p, i) => {
    const o = i * 16;
    // ICO width/height field is 1 byte; 0 means 256
    dir.writeUInt8(p.size === 256 ? 0 : p.size, o);
    dir.writeUInt8(p.size === 256 ? 0 : p.size, o + 1);
    dir.writeUInt8(0, o + 2); // colors in palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // color planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(p.data.length, o + 8); // size of image data
    dir.writeUInt32LE(offset, o + 12); // offset to image data
    offset += p.data.length;
  });

  const ico = Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
  await writeFile(OUT, ico);
  console.log(
    `✓ wrote ${OUT} — ${pngs.length} sizes (${SIZES.join(", ")}px), ${ico.length} bytes`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
