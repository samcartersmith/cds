import React, { forwardRef } from 'react';

import { SharedProps } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { scaledDownState } from '../styles/interactable';
import { buttonResets } from '../styles/resetStyles';
import { ButtonOrLink } from './ButtonOrLink';
import { Interactable, InteractableProps } from './Interactable';

export type LinkableProps = {
  /** Callback fired when the element is pressed. */
  onPress?: React.MouseEventHandler;
  /** URL that this links to when pressed. */
  to?: string;
};

export type PressableProps = {
  /** Is the element currenty loading. */
  loading?: boolean;
} & React.AriaAttributes &
  SharedProps &
  LinkableProps;

export type PressableInternalProps = {
  /** Element or component to render the container as. */
  as?:
    | 'a'
    | 'button'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any>;
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
} & PressableProps &
  Omit<InteractableProps, 'as' | 'onClick' | 'onClickCapture' | 'pressed'>;

export const Pressable = forwardRef(function Pressable(
  {
    as,
    children,
    className,
    disabled,
    loading,
    onPress,
    noScaleOnPress,
    ...props
  }: PressableInternalProps,
  ref: React.Ref<Element>,
) {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = disabled || loading;

  return (
    <Interactable
      aria-busy={loading}
      aria-disabled={isDisabled}
      as={as ?? ButtonOrLink}
      onClick={onPress}
      {...props}
      className={cx(buttonResets, !noScaleOnPress && scaledDownState, className)}
      disabled={isDisabled}
      ref={ref}
    >
      {children}
    </Interactable>
  );
});
