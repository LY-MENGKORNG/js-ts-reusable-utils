export const DATE_FORMAT_MAP: Readonly<DateFormatMap> = {
  // DAY/MONTH/YEAR
  "DD/MM/YYYY": {
    regex: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    separator: "/",
    parser: (matcher) => ({
      day: +matcher[1]!,
      month: +matcher[2]!,
      year: +matcher[3]!,
    }),
  },
  "DD-MM-YYYY": {
    regex: /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    separator: "-",
    parser: (matcher) => ({
      day: +matcher[1]!,
      month: +matcher[2]!,
      year: +matcher[3]!,
    }),
  },

  // MONTH/DAY/YEAR
  "MM/DD/YYYY": {
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    separator: "/",
    parser: (matcher) => ({
      month: +matcher[1]!,
      day: +matcher[2]!,
      year: +matcher[3]!,
    }),
  },
  "MM-DD-YYYY": {
    regex: /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/,
    separator: "-",
    parser: (matcher) => ({
      month: +matcher[1]!,
      day: +matcher[2]!,
      year: +matcher[3]!,
    }),
  },

  // YEAR/MONTH/DAY
  "YYYY/MM/DD": {
    regex: /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
    separator: "/",
    parser: (matcher) => ({
      year: +matcher[1]!,
      month: +matcher[2]!,
      day: +matcher[3]!,
    }),
  },
  "YYYY-MM-DD": {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    separator: "-",
    parser: (matcher) => ({
      year: +matcher[1]!,
      month: +matcher[2]!,
      day: +matcher[3]!,
    }),
  },
};

export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
