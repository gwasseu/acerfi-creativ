import { ImageResponse } from "next/og";
import { ACERFI } from "@/lib/acerfi";

export const alt = `${ACERFI.creativ.name} — ${ACERFI.creativ.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(245,180,0,0.30), transparent 65%), #0A0A0A",
          fontFamily: "sans-serif",
          color: "#FAFAF7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#F5B400",
          }}
        >
          <div
            style={{
              width: 56,
              height: 2,
              background: "#F5B400",
            }}
          />
          {ACERFI.creativ.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>L&apos;Agence Créative</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #FFD93D 0%, #F5B400 50%, #D9930B 100%)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              Augmentée par l&apos;IA
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(250,250,247,0.65)",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {ACERFI.creativ.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "rgba(250,250,247,0.55)",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>Yaoundé</span>
            <span style={{ color: "rgba(245,180,0,0.4)" }}>·</span>
            <span>Douala</span>
            <span style={{ color: "rgba(245,180,0,0.4)" }}>·</span>
            <span>Cameroun</span>
          </div>
          <div style={{ color: "#F5B400" }}>creativ.acerfi.net</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
