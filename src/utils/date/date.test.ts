// @ts-ignore
import { describe, expect, test } from "bun:test";
import {
  formatDate,
  getDaysInMonth,
  isLeapYear,
  isValidDate,
  pad,
  validateDateParts,
} from "./date";

describe("📆 The utility function for formatting date", () => {
  describe("🎑 Leap Year Check [isLeapYear]", () => {
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
      expect(isValidDate("2026-01-01", "dd/MM/yyyy")).toBe(false);
      expect(isValidDate("", "dd/MM/yyyy")).toBe(false);
      expect(isValidDate("hi-mom", "MM/dd/yyyy")).toBe(false);
    });
    test("✅ Should return true for valid date with correct format", () => {
      expect(isValidDate("31/01/2026", "dd/MM/yyyy")).toBe(true);
      expect(isValidDate("01/12/2026", "MM/dd/yyyy")).toBe(true);
      expect(isValidDate("2026-01-01", "yyyy-MM-dd")).toBe(true);
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

      expect(formatDate(date, "dd/MM/yyyy")).toBe("01/10/2026");
      expect(formatDate(date, "yyyy-MM-dd")).toBe("2026-10-01");
      expect(formatDate(date, "MM/dd/yyyy")).toBe("10/01/2026");
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

  describe("📅 Validate date parts [validateDateParts]", () => {
    test("🧭 Should validate date parts correctly", () => {
      expect(validateDateParts({ day: "29", month: "2", year: "2024" })).toBe(
        null,
      ); // Valid leap day
      expect(validateDateParts({ day: "29", month: "2", year: "2025" })).toBe(
        "Invalid day for the given month and year.",
      ); // Invalid leap day
      expect(validateDateParts({ day: "31", month: "1", year: "2026" })).toBe(
        null,
      ); // Valid date
      expect(validateDateParts({ day: "31", month: "4", year: "2026" })).toBe(
        "Invalid day for the given month and year.",
      ); // Invalid date (April has only 30 days)
      expect(validateDateParts({ day: "abc", month: "1", year: "2026" })).toBe(
        "Date contains non-numeric values.",
      ); // Non-numeric day
      expect(validateDateParts({ day: "1", month: "xyz", year: "2026" })).toBe(
        "Date contains non-numeric values.",
      ); // Non-numeric month
      expect(validateDateParts({ day: "1", month: "1", year: "abcd" })).toBe(
        "Date contains non-numeric values.",
      ); // Non-numeric year
      expect(validateDateParts({ day: "1", month: "1", year: "10000" })).toBe(
        "Year must be between 1 and 9999.",
      ); // Year out of range
    });
  });
});
