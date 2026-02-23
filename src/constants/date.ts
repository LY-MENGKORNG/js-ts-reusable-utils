export const DATE_FORMAT_MAP: Readonly<DateFormatMap> = {
  "dd/MM/yyyy": {
    regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    separator: "/",
    order: [(p) => p.day, (p) => p.month, (p) => p.year],
  },
  "dd-MM-yyyy": {
    regex: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
    separator: "-",
    order: [(p) => p.day, (p) => p.month, (p) => p.year],
  },
  "MM/dd/yyyy": {
    regex: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    separator: "/",
    order: [(p) => p.month, (p) => p.day, (p) => p.year],
  },
  "yyyy/MM/dd": {
    regex: /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
    separator: "/",
    order: [(p) => p.year, (p) => p.month, (p) => p.day],
  },
  "yyyy-MM-dd": {
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    separator: "-",
    order: [(p) => p.year, (p) => p.month, (p) => p.day],
  },
};
