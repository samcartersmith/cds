export type BadgeVariant = 'empty' | 'singleDigit' | 'doubleDigit' | 'dot';
export type BadgeValue = number | string;

/** @deprecated */
export type BadgeBaseProps = {
  value?: BadgeValue;
  variant?: BadgeVariant;
};
