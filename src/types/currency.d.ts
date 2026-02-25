type IntlCurrency =
  typeof import("@/constants/currency").INTL_CURRENCIES[number];

type CurrencyFormatOptions = NonNullable<
  Parameters<Intl.NumberFormatConstructor>[1]
>;
