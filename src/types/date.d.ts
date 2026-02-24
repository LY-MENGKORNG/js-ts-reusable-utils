/** Date format pattern */
type DateFormat =
  | "DD/MM/YYYY"
  | "DD-MM-YYYY"
  | "MM/DD/YYYY"
  | "MM-DD-YYYY"
  | "YYYY/MM/DD"
  | "YYYY-MM-DD";

type DayString = `${number}${number}`;
type MonthString = `${number}${number}`;
type YearString = `${number}${number}${number}${number}`;

/** The string of accepted date */
type DateString =
  | `${DayString}/${MonthString}/${YearString}`
  | `${MonthString}/${DayString}/${YearString}`
  | `${YearString}-${MonthString}-${DayString}`
  | `${YearString}/${MonthString}/${DayString}`
  | `${DayString}-${MonthString}-${YearString}`;

type ParseSuccess = { valid: true; date: Date };
type ParseFailure = { valid: false; error: string };
type ParseResult = ParseSuccess | ParseFailure;

/** The general format of date segments */
type DateSegment = "day" | "month" | "year";

/** The general format of date separators */
type DateSeparator = "/" | "-";

type DateFormatEntry = {
  separator: DateSeparator;
  regex: RegExp;
  parser: (
    matcher: RegExpMatchArray,
  ) => { day: number; month: number; year: number };
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
  day: number;
  /** The month part of the date. */
  month: number;
  /** The year part of the date. */
  year: number;
};

/** The input type for date */
type DateInput = Date | string | number;

type HourString =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23";
type MinuteString =
  | HourString
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56"
  | "57"
  | "58"
  | "59";
type SecondString = MinuteString;
type TimeString = `${HourString}:${MinuteString}:${SecondString}`;
