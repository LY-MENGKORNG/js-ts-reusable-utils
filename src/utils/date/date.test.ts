// @ts-ignore
import { describe, expect, test } from "bun:test";
import {
  formatDate,
  getDaysInMonth,
  isLeapYear,
  isValidDateFormat,
  pad,
} from "./date.ts";

describe("📆 The utility function for formatting date", () => {
  describe("🎑 Leap Year Check [isLeapYear]", () => {
    test("Should verify leap year correctly", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2025)).toBe(false);
    });
  });

  describe("🔍 Date Validation [isValidDateFormat]", () => {
    test("✅ Should return true for valid date with correct format", () => {
      expect(isValidDateFormat("31/01/2026", "DD/MM/YYYY")).toBe(true);
      expect(isValidDateFormat("01/12/2026", "MM/DD/YYYY")).toBe(true);
      expect(isValidDateFormat("2026-01-01", "YYYY-MM-DD")).toBe(true);
    });
  });

  describe("🔬 Date pad", () => {
    test("Should add '0' if the number of degit is one", () => {
      expect(pad(1)).toBe("01");
    });
    test("Should not add '0' if the number of degit is two", () => {
      expect(pad(10)).toBe("10");
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

  describe("🌞 Days in a month", () => {
    test("🗓 Should return correct number of days in a month", () => {
      expect(getDaysInMonth(2, 2026)).toBe(28); // February in a leap year
      expect(getDaysInMonth(2, 2025)).toBe(28); // February in a non-leap year
      expect(getDaysInMonth(1, 2026)).toBe(31); // January
      expect(getDaysInMonth(4, 2026)).toBe(30); // April
    });
  });
});
