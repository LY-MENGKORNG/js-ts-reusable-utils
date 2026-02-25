import { describe, expect, it } from "bun:test";
import {
  formatDate,
  formatTimeHM,
  getDaysInMonth,
  isLeapYear,
  isValidDateFormat,
  pad,
} from "../date";

describe("📆 The utility function for formatting date", () => {
  describe("🎑 Leap Year Check [isLeapYear]", () => {
    it("Should verify leap year correctly", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2025)).toBe(false);
    });
  });

  describe("🔍 Date Validation [isValidDateFormat]", () => {
    it("✅ Should return true for valid date with correct format", () => {
      expect(isValidDateFormat("31/01/2026", "DD/MM/YYYY")).toBe(true);
      expect(isValidDateFormat("01/12/2026", "MM/DD/YYYY")).toBe(true);
      expect(isValidDateFormat("2026-01-01", "YYYY-MM-DD")).toBe(true);
    });
  });

  describe("🔬 Date pad", () => {
    it("Should add '0' if the number of degit is one", () => {
      expect(pad(1)).toBe("01");
    });
    it("Should not add '0' if the number of degit is two", () => {
      expect(pad(10)).toBe("10");
    });
  });

  describe("🪒 Date Formatting [formatDate]", () => {
    it("🕒 Should format date correctly", () => {
      const date = new Date("2026/10/01");

      expect(formatDate(date, "DD/MM/YYYY")).toBe("01/10/2026");
      expect(formatDate(date, "YYYY-MM-DD")).toBe("2026-10-01");
      expect(formatDate(date, "MM/DD/YYYY")).toBe("10/01/2026");
    });
  });

  describe("🌞 Days in a month", () => {
    it("🗓 Should return correct number of days in a month", () => {
      expect(getDaysInMonth(2, 2026)).toBe(28); // February in a leap year
      expect(getDaysInMonth(2, 2025)).toBe(28); // February in a non-leap year
      expect(getDaysInMonth(1, 2026)).toBe(31); // January
      expect(getDaysInMonth(4, 2026)).toBe(30); // April
    });
  });

  describe("⏰ Time Formatting [formatTimeHM]", () => {
    it("🕒 Should format time correctly", () => {
      expect(formatTimeHM("14:30:00")).toBe("14h30");
      expect(formatTimeHM("09:15:45")).toBe("09h15");
    });
    it("⏰ Should throw an error for invalid time format", () => {
      // @ts-expect-error
      expect(() => formatTimeHM("14:30")).toThrow("Invalid time format: 14:30");
      // @ts-expect-error
      expect(() => formatTimeHM("14:30:00:00")).toThrow(
        "Invalid time format: 14:30:00:00",
      );
      // @ts-expect-error
      expect(() => formatTimeHM("hi-mom")).toThrow(
        "Invalid time format: hi-mom",
      );
    });
  });
});
