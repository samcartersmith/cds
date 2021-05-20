import React, { forwardRef } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { scaledDownState } from '../styles/interactable';
import { buttonResets } from '../styles/resetStyles';
import { Interactable, InteractableProps } from './Interactable';

export interface PressableProps extends React.AriaAttributes, SharedProps {
  /** Is the element currenty loading. */
  loading?: boolean;
  /** Callback fired when the element is pressed. */
  onPress?: React.MouseEventHandler;
}

export interface PressableInternalProps
  extends PressableProps,
    Omit<InteractableProps, 'as' | 'onClick' | 'onClickCapture' | 'pressed'> {
  /** Element or component to render the container as. */
  as:
    | 'a'
    | 'button'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>;
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
      className={cx(buttonResets, !noScaleOnPress && scaledDownState, className)}
      disabled={disabled || loading}
      ref={ref}
    >
      {children}
    </Interactable>
  );
});
