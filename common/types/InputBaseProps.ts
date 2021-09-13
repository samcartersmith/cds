import { ReactNode } from 'react';
import type { SharedProps } from './SharedProps';
import { PaletteForeground } from './Palette';

export type InputBaseProps = {
  children?: (p: InputBaseProps) => ReactNode;
  /**
   * Determines the sentiment of the input
   * @default foregroundMuted
   */
  variant?: PaletteForeground;
  /**
   * Width of input
   * @default 100%
   * */
  width?: number | string | 'auto';
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
  messageArea?: ReactNode;
  /** A message indicating the purpose of this input */
  label?: ReactNode;
} & SharedProps;
