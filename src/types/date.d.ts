/** Date format pattern */
type DateFormat =
  | "dd/MM/yyyy"
  | "MM/dd/yyyy"
  | "yyyy-MM-dd"
  | "yyyy/MM/dd"
  | "dd-MM-yyyy";

type ParseSuccess = { valid: true; date: Date };
type ParseFailure = { valid: false; error: string };
type ParseResult = ParseSuccess | ParseFailure;

/** The general format of date segments */
type DateSegment = "day" | "month" | "year";

/** The general format of date separators */
type DateSeparator = "/" | "-";

type DateFormatEntry = {
  regex: RegExp;
  separator: DateSeparator;
  /** The order of the date segments in the format. */
  order: Array<(date: DateParts) => string>;
};

/**
 * 💡 A date format entry is a record that contains the following properties:
 * - `regex`: A regular expression that matches the format.
 * - `separator`: The separator used in the format.
 * - `order`: The order of the date segments in the format.
 */
type DateFormatMap = Record<DateFormat, DateFormatEntry>;

/**
 * The parts of date
 */
type DateParts = {
  /** The day part of the date. */
  day: string;
  /** The month part of the date. */
  month: string;
  /** The year part of the date. */
  year: string;
};

/** The input type for date */
type DateInput = Date | string | number;
