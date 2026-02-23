export function isValidDate(dateString: string, format: Format): boolean {
  const regexMap: Record<Format, RegExp> = {
    "DD/MM/YYYY": /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "MM/DD/YYYY": /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    "YYYY-MM-DD": /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  };

  if (!(format in regexMap)) {
    throw new Error(`Invalid format: ${format}`);
  }

  return regexMap[format].test(dateString);
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
