export const DATE_FORMAT_MAP: Readonly<DateFormatMap> = {
  // DAY/MONTH/YEAR
  "DD/MM/YYYY": {
    regex: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    separator: "/",
  },
  "DD-MM-YYYY": {
    regex: /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    separator: "-",
  },

  // MONTH/DAY/YEAR
  "MM/DD/YYYY": {
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
    separator: "/",
  },
  "MM-DD-YYYY": {
    regex: /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])-\d{4}$/,
    separator: "-",
  },

  // YEAR/MONTH/DAY
  "YYYY/MM/DD": {
    regex: /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
    separator: "/",
  },
  "YYYY-MM-DD": {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    separator: "-",
  },
};

export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
