import React, { forwardRef } from 'react';

import { cx } from 'linaria';

import { scaledDownState } from '../styles/interactable';
import { Interactable, InteractableProps } from './Interactable';

export interface PressableProps extends React.AriaAttributes {
  /** Is the element currenty loading. */
  loading?: boolean;
  /** Callback fired when the element is pressed. */
  onPress?: React.MouseEventHandler;
}

export interface PressableInternalProps
  extends PressableProps,
    Omit<InteractableProps, 'onClick' | 'onClickCapture' | 'pressed'> {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
}

export const Pressable = forwardRef(function Pressable(
  {
    children,
    className,
    disabled,
    loading,
    onPress,
    noScaleOnPress,
    ...props
  }: PressableInternalProps,
  ref: React.Ref<Element>
) {
  return (
    <Interactable
      aria-busy={loading}
      aria-disabled={disabled || loading}
      onClick={onPress}
      {...props}
      className={cx(!noScaleOnPress && scaledDownState, className)}
      disabled={disabled || loading}
      ref={ref}
    >
      {children}
    </Interactable>
  );
});
