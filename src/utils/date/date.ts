import { REGEX_DATE } from "../../constants/date";

/**
 * Validate a date string according to a specified format.
 *
 * @param dateString The string of date to validate
 * @param format Format of the date string
 * @returns {boolean} Whether the date string is valid according to the specified format
 * @example
 * isValidDate("01/01/2026", "DD/MM/YYYY"); // true
 * isValidDate("01/01/2026", "MM/DD/YYYY"); // false
 */
export function isValidDate(dateString: string, format: Format): boolean {
  if (!(format in REGEX_DATE)) {
    throw new Error(`Invalid format: ${format}`);
  }

  return REGEX_DATE[format].test(dateString);
}

/**
 * Format a date according to a specified format.
 *
 * @param date Date to format
 * @param format Format to use
 * @returns Formatted date string
 * @example
 * formatDate(new Date(2026, 0, 1), "DD/MM/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "MM/DD/YYYY"); // "01/01/2026"
 * formatDate(new Date(2026, 0, 1), "YYYY-MM-DD"); // "2026-01-01"
 */
export function formatDate(date: Date, format: Format) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Add 1 to get the correct month (0-based index)
  const year = date.getFullYear();

  const pad = (value: number) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  };

  return format
    .replace("DD", pad(day))
    .replace("MM", pad(month))
    .replace("YYYY", year.toString());
}
