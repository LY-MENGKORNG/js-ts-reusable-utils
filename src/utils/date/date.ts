import { DATE_FORMAT_MAP } from "@/constants/date";

/**
 * Validate a date string according to a specified format.
 *
 * @param {string} dateString The string of date to validate
 * @param {DateFormat} format Format of the date string
 * @returns {boolean} Whether the date string is valid according to the specified format
 * @example
 * isValidDate("01/01/2026", "DD/MM/YYYY"); // true
 * isValidDate("01/01/2026", "MM/DD/YYYY"); // false
 */
export function isValidDate(dateString: string, format: DateFormat): boolean {
  if (!(format in DATE_FORMAT_MAP)) {
    throw new Error(`Invalid format: ${format}`);
  }

  return DATE_FORMAT_MAP[format].regex.test(dateString);
}

/**
 * Check if a year is a leap year.
 * @description 💡 A leap year is a calendar year that contains `366` days instead of the usual `365`, with the extra day added as `February 29`
 *
 * @param {number} year Year to check
 * @example
 * isLeapYear(year) `true` if the given year is a leap year.
 */
export function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Pad a number with leading zeros to ensure it has at least two digits.
 *
 * @param {number} value Number to pad
 * @returns Padded number as a string
 */
export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Format a date according to a specified format.
 *
 * @param {Date} date Date to format
 * @param {DateFormat} format Format to use
 * @returns Formatted date string
 * @example
 * formatDate(new Date(2026, 0, 1), "DD/MM/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "MM/DD/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "YYYY-MM-DD"); // "2026-01-01"
 */
export function formatDate(date: Date, format: DateFormat) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add 1 to get the correct month (0-based index)
  const year = date.getFullYear();

  return format
    .replace("dd", pad(day))
    .replace("MM", pad(month))
    .replace("yyyy", year.toString());
}

export function getDaysInMonth(month: number, year: number): number {
  const feb = isLeapYear(year) ? 29 : 28;
  const days = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1]!;
}

export function validateDateParts(
  { day: d, month: m, year: y }: DateParts,
): string | null {
  const day = parseInt(d, 10);
  const month = parseInt(m, 10);
  const year = parseInt(y, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return "Date contains non-numeric values.";
  }
  if (year < 1 || year > 9999) {
    return "Year must be between 1 and 9999.";
  }
  if (month < 1 || month > 12) {
    return "Month must be between 1 and 12.";
  }
  if (day < 1 || day > getDaysInMonth(month, year)) {
    return "Invalid day for the given month and year.";
  }
  return null;
}
