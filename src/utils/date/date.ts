import { DATE_FORMAT_MAP } from "../../constants/date.ts";

/**
 * Validate a date string according to a specified format.
 *
 * @param {string} date The string of date to validate
 * @param {DateFormat} format Format of the date string
 * @returns {boolean} Whether the date string is valid according to the specified format
 * @example
 * isValidDateFormat("01/01/2026", "DD/MM/YYYY"); // true
 * isValidDateFormat("01/01/2026", "MM/DD/YYYY"); // false
 */
export function isValidDateFormat(
  date: DateString,
  format: DateFormat,
): boolean {
  return DATE_FORMAT_MAP[format].regex.test(date);
}

/**
 * Check if a year is a leap year.
 * @description A leap year is a calendar year that contains `366` days instead of the usual `365`, with the extra day added as `February 29`
 *
 * @param {number} year Year to check
 * @return {boolean}
 * @example
 * isLeapYear(year) `true` if the given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Pad a number with leading zeros to ensure it has at least two digits.
 *
 * @param {number} value Number to pad
 * @returns {string} Padded number as a string
 */
export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Format a date according to a specified format.
 *
 * @param {Date} date Date to format
 * @param {DateFormat} format Format to use
 * @returns {string} Formatted date string
 * @example
 * formatDate(new Date(2026, 0, 1), "DD/MM/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "MM/DD/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "YYYY-MM-DD"); // "2026-01-01"
 */
export function formatDate(
  date: Date,
  format: DateFormat = "DD-MM-YYYY",
): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add 1 to get the correct month (0-based index)
  const year = date.getFullYear();

  return format
    .replace("DD", pad(day))
    .replace("MM", pad(month))
    .replace("YYYY", year.toString());
}

/**
 * Get the number of days in a specific month and year.
 *
 * @param {number} month The month (1-12)
 * @param {number} year The year
 * @returns {number} The number of days in the given month and year
 *
 * @example
 * getDaysInMonth(2, 2026); // 29 (February in a leap year)
 * getDaysInMonth(2, 2025); // 28 (February in a non-leap year)
 */
export function getDaysInMonth(month: number, year: number): number {
  const feb = isLeapYear(year) ? 29 : 28;
  const days = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1]!;
}
