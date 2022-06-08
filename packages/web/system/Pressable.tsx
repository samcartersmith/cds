import React, { forwardRef, useCallback } from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';
import { ComponentEventHandlerProps } from '@cbhq/cds-common/types/ComponentEventHandlerProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { cx } from '../utils/linaria';

import { ButtonOrLink } from './ButtonOrLink';
import { Interactable, InteractableProps } from './Interactable';

const scaledDownState = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active {
    transform: scale(0.98);
  }
`;

const pressableResetStyles: string = css`
  padding: 0;
`;

const pressablePaddingResetStyles = css`
  padding: 0;
`;

export type OnPress = React.MouseEventHandler;

export type LinkableProps = {
  /** Callback fired when the element is pressed. */
  onPress?: OnPress;
  /** Callback fired when a key is pressed */
  onKeyPress?: React.KeyboardEventHandler;
  /** URL that this links to when pressed. */
  to?: string;
};

export type PressableProps = {
  /** Is the element currenty loading. */
  loading?: boolean;
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
} & React.AriaAttributes &
  SharedProps &
  LinkableProps &
  ComponentEventHandlerProps &
  Omit<SharedAccessibilityProps, 'id'>;

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
    onKeyPress,
    noScaleOnPress,
    tabIndex,
    eventConfig,
    ...props
  }: PressableInternalProps,
  ref: React.Ref<Element>,
) {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = disabled || loading;

  let resetStyles = ''; // empty string is falsy
  const { borderColor } = props;
  if (!className) {
    if (!borderColor) {
      resetStyles = pressableResetStyles;
    } else {
      resetStyles = pressablePaddingResetStyles;
    }
  }

  const onEventHandler = useEventHandler('Button', 'onPress', eventConfig);
  const onClick = useCallback(
    (event: React.MouseEvent) => {
      onPress?.(event);
      onEventHandler();
    },
    [onPress, onEventHandler],
  );

  return (
    <Interactable
      aria-busy={loading}
      aria-disabled={isDisabled}
      as={as ?? ButtonOrLink}
      onClick={onClick}
      onKeyPress={onKeyPress}
      {...props}
      className={cx(!noScaleOnPress && scaledDownState, className, resetStyles)}
      disabled={isDisabled}
      ref={ref}
      tabIndex={tabIndex}
    >
      {children}
    </Interactable>
  );
});
