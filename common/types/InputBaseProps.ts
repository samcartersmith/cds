import { ReactNode } from 'react';
import type { SharedProps } from './SharedProps';
import { PaletteForeground } from './Palette';
import { DimensionValue } from './DimensionStyles';
import { BorderRadius } from './BorderRadius';

export type InputVariant = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'foreground' | 'primary' | 'foregroundMuted'
>;

export type InputStackBorderRadius = Extract<BorderRadius, 'input'>;

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
  width?: `${number}%`;
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
  prependNode?: ReactNode;
  /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
  startNode?: ReactNode;
  /** Appends custom content to the end. Content is not part of input */
  appendNode?: ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
  endNode?: ReactNode;
  /** Editable area of the Input */
  inputNode: ReactNode;
  /** Text shown below input. Used for when label is not enough to indicate what this input does */
  helperTextNode?: ReactNode;
  /** A message indicating the purpose of this input */
  labelNode?: ReactNode;
  /** This should only be used when focused styles need to be persisted */
  focused?: boolean;
  /**
   * Leverage one of the borderRadius styles we offer to round the corners of the input.
   * @default input
   */
  borderRadius?: InputStackBorderRadius;
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
  helperText?: string;
};
