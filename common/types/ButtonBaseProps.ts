import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'positive' | 'negative';

export interface ButtonBaseProps {
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Children to render within the button. */
  children: NonNullable<React.ReactNode>;
  /** Reduce the inner spacing. */
  compact?: boolean;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Uniquely identify the button within a form. */
  name?: string;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
}
