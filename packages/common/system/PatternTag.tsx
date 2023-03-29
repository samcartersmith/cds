import React from 'react';

import { RequireExactlyOneType } from '../utils/requireExactlyOneType';

type PatternTagProps = {
  /** This component needs to wrap a recommended pattern. */
  children: React.ReactElement;
} & RequireExactlyOneType<{
  /** Set to track a Disclosure pattern. */
  disclosure: true;
  /** Set to track an Empty State pattern. */
  emptyState: true;
  /** Set to track an Error pattern. */
  error: true;
  /** Set to track a Form pattern. */
  form: true;
  /** Set to track an Informational pattern. */
  informational: true;
  /** Set to track a Loading State pattern. */
  loadingState: true;
  /** Set to track a Success pattern. */
  success: true;
  /** Set to track a Warning pattern. */
  warning: true;
}>;

/**
 * This component is a simple wrapper and code marker that can be
 * consumed by the Adoption Tracker to track pattern usage.
 * Pattern name props are not consumed by this component,
 * but only by the Adoption Tracker for tracking purposes.
 */
export const PatternTag = ({ children }: PatternTagProps) => children;
