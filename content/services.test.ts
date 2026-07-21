import { describe, expect, it } from "vitest";
import {
  POLES,
  SERVICES,
  SERVICE_BY_SLUG,
  getRelatedServices,
  getServicesByPole,
} from "./services";

describe("SERVICES catalogue integrity", () => {
  it("has at least one service", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every service points to an existing pole", () => {
    const poleSlugs = new Set(POLES.map((p) => p.slug));
    for (const service of SERVICES) {
      expect(poleSlugs, `service "${service.slug}" → unknown pole "${service.pole}"`).toContain(
        service.pole,
      );
    }
  });

  it("every related[] entry resolves to an existing service", () => {
    for (const service of SERVICES) {
      for (const related of service.related ?? []) {
        expect(
          SERVICE_BY_SLUG[related],
          `service "${service.slug}" lists related "${related}" which doesn't exist`,
        ).toBeDefined();
      }
    }
  });

  it("priceFcfa is null or a positive integer", () => {
    for (const s of SERVICES) {
      if (s.priceFcfa === null) continue;
      expect(s.priceFcfa, `service "${s.slug}"`).toBeGreaterThan(0);
      expect(Number.isInteger(s.priceFcfa), `service "${s.slug}" priceFcfa not integer`).toBe(true);
    }
  });

  it("SERVICE_BY_SLUG covers every service", () => {
    expect(Object.keys(SERVICE_BY_SLUG).length).toBe(SERVICES.length);
  });
});

describe("getRelatedServices", () => {
  it("returns empty array for unknown slug", () => {
    expect(getRelatedServices("does-not-exist")).toEqual([]);
  });

  it("filters out related slugs that don't resolve", () => {
    // Sanity: the function defends against typos in related[] silently.
    const results = SERVICES.flatMap((s) => getRelatedServices(s.slug));
    for (const r of results) {
      expect(r).toBeDefined();
      expect(r.slug).toBeTruthy();
    }
  });
});

describe("getServicesByPole", () => {
  it("every pole has at least one service", () => {
    for (const pole of POLES) {
      const services = getServicesByPole(pole.slug);
      expect(services.length, `pole "${pole.slug}" has no services`).toBeGreaterThan(0);
    }
  });
});
