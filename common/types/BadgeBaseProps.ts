export type BadgeVariant = 'empty' | 'singleDigit' | 'doubleDigit' | 'dot';
export type BadgeValue = number | string;

export interface BadgeBaseProps {
  value?: BadgeValue;
  variant?: BadgeVariant;
}
