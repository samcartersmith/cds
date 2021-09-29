import { ReactNode } from 'react';
import type { SharedProps } from './SharedProps';
import { PaletteForeground } from './Palette';

export type InputVariant = Extract<
  PaletteForeground,
  'positive' | 'negative' | 'foreground' | 'primary' | 'foregroundMuted'
>;

export type InputBaseProps = {
  children?: (p: InputBaseProps) => ReactNode;
  /**
   * Determines the sentiment of the input. Because
   * we allow startContent and endContent to be custom ReactNode,
   * the content placed inside these slots will not change colors according
   * to the variant. You will have to add that yourself
   * @default foregroundMuted
   */
  variant?: InputVariant;
  /**
   * Width of input. Can only adjust using percentage for now
   * @default 100%
   * */
  width?: string;
  /**
   * Height of input
   * @default auto
   */
  height?: number | string | 'auto';
  /**
   * Toggles input interactability and opacity
   * @default false
   */
  disabled?: boolean;
  /** Prepends custom content to the start. Content is not part of input */
  prepend?: ReactNode;
  /** Adds content to the start of the inner input. Refer to diagram for location of startContent within input */
  startContent?: ReactNode;
  /** Appends custom content to the end. Content is not part of input */
  append?: ReactNode;
  /** Adds content to the end of the inner input. Refer to diagram for location of startContent within input */
  endContent?: ReactNode;
  /** Editable area of the Input */
  input: ReactNode;
  /** Text shown below input. Used for when label is not enough to indicate what this input does */
  helperText?: ReactNode;
  /** A message indicating the purpose of this input */
  label?: ReactNode;
} & SharedProps;
