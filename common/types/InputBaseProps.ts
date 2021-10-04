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
   * Width of input. The number is converted to percentage.
   * @default 100
   * */
  width?: number;
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
} & SharedProps;
