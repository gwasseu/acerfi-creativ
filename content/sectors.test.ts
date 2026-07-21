import { describe, expect, it } from "vitest";
import { SECTORS, SECTOR_BY_SLUG } from "./sectors";
import { SERVICE_BY_SLUG } from "./services";

describe("SECTORS catalogue integrity", () => {
  it("has at least one sector", () => {
    expect(SECTORS.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = SECTORS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every recommendedServices[] entry resolves to an existing service", () => {
    for (const sector of SECTORS) {
      for (const slug of sector.recommendedServices) {
        expect(
          SERVICE_BY_SLUG[slug],
          `sector "${sector.slug}" recommends service "${slug}" which doesn't exist`,
        ).toBeDefined();
      }
    }
  });

  it("SECTOR_BY_SLUG covers every sector", () => {
    expect(Object.keys(SECTOR_BY_SLUG).length).toBe(SECTORS.length);
  });

  it("every sector has a non-empty problems and solutions list", () => {
    for (const sector of SECTORS) {
      expect(sector.problems.length, `sector "${sector.slug}" problems`).toBeGreaterThan(0);
      expect(sector.solutions.length, `sector "${sector.slug}" solutions`).toBeGreaterThan(0);
    }
  });
});
