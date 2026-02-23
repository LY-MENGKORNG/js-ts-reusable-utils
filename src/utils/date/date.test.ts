import { describe, test, expect } from "bun:test";
import { formatDate, isLeapYear, isValidDate } from "./date";

describe("📆 The utility function for formatting date", () => {
  describe("Leap Year Check [isLeapYear]", () => {
    test("Should verify leap year correctly", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2025)).toBe(false);
    });
  });
  describe("🔍 Date Validation [isValidDate]", () => {
    test("🚨 Should throw error for invalid format", () => {
      const format = "DD/MM";
      // @ts-ignore
      expect(() => isValidDate("01/01/2026", format)).toThrow(
        `Invalid format: ${format}`,
      );
    });
    test("❗Should return false for date invalid to format", () => {
      expect(isValidDate("2026-01-01", "DD/MM/YYYY")).toBe(false);
      expect(isValidDate("", "DD/MM/YYYY")).toBe(false);
      expect(isValidDate("hi-mom", "MM/DD/YYYY")).toBe(false);
    });
    test("✅ Should return true for valid date with correct format", () => {
      expect(isValidDate("31/01/2026", "DD/MM/YYYY")).toBe(true);
      expect(isValidDate("01/12/2026", "MM/DD/YYYY")).toBe(true);
      expect(isValidDate("2026-01-01", "YYYY-MM-DD")).toBe(true);
    });
  });

  describe("🪒 Date Formatting [formatDate]", () => {
    test("🕒 Should format date correctly", () => {
      const date = new Date("2026/10/01");

      expect(formatDate(date, "DD/MM/YYYY")).toBe("01/10/2026");
      expect(formatDate(date, "YYYY-MM-DD")).toBe("2026-10-01");
      expect(formatDate(date, "MM/DD/YYYY")).toBe("10/01/2026");
    });
  });
});
