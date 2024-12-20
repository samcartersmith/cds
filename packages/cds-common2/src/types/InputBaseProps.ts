import { BorderRadius } from './BorderRadius';
import { DimensionValue } from './DimensionStyles';
import { PaletteForeground } from './Palette';
import type { SharedProps } from './SharedProps';

export type InputVariant = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'foreground' | 'primary' | 'foregroundMuted' | 'secondary'
>;

export type InputStackBorderRadius = Extract<BorderRadius, 'rounded' | 'roundedFull'>;

export type InputStackBaseProps = {
  /**
   * Determines the sentiment of the input. Because
   * we allow startContent and endContent to be custom ReactNode,
   * the content placed inside these slots will not change colors according
   * to the variant. You will have to add that yourself
   * @default foregroundMuted
   */
  variant?: InputVariant;
  /**
   * Width of input as a percentage string.
   * @default 100%
   * */
  width?: `${number}%` | number;
  /**
   * Height of input
   * @default auto
   */
  height?: DimensionValue;
  /**
   * Toggles input interactability and opacity
   * @default false
   */
  disabled?: boolean;
  /** Prepends custom content to the start. Content is not part of input */
  prependNode?: React.ReactNode;
  /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
  startNode?: React.ReactNode;
  /** Appends custom content to the end. Content is not part of input */
  appendNode?: React.ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
  endNode?: React.ReactNode;
  /** Editable area of the Input */
  inputNode: React.ReactNode;
  /** Text shown below input. Used for when label is not enough to indicate what this input does */
  helperTextNode?: React.ReactNode;
  /** A message indicating the purpose of this input */
  labelNode?: React.ReactNode;
  /** This should only be used when focused styles need to be persisted */
  focused?: boolean;
  /**
   * Leverage one of the borderRadius styles we offer to round the corners of the input.
   * @default rounded
   */
  borderRadius?: InputStackBorderRadius;
  /**
   * Disable default focus styles
   * @default false
   */
  disableFocusedStyle?: boolean;
  /**
   * Enable Color Surge motion
   * @default false
   */
  enableColorSurge?: boolean;
} & SharedProps;

export type SharedInputProps = {
  /**
   * Enables compact variation
   * @default false
   */
  compact?: boolean;
  /** Short messageArea indicating purpose of input */
  label?: string;
  /** Placeholder text displayed inside of the input. Will be replaced if there is a value. */
  placeholder?: string;
  /**
   * For cases where label is not enough information
   * to describe what the text input is for. Can also be used for
   * showing positive/negative messages
   */
  helperText?: string | React.ReactNode;
};
