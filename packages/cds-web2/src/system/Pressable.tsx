import React, { forwardRef, useCallback } from 'react';
import { css, cx } from '@linaria/core';
import { useEventHandler } from '@cbhq/cds-common2/hooks/useEventHandler';
import { ComponentEventHandlerProps } from '@cbhq/cds-common2/types/ComponentEventHandlerProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { ButtonOrLink } from './ButtonOrLink';
import { Interactable, InteractableProps } from './Interactable';
import {
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';

const scaledDownStyle = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active {
    transform: scale(0.98);
  }
`;

const resetStyle = css`
  padding: 0;
`;

const loadingStyle = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
  background-color: var(${interactablePressedBackground});
  > * {
    opacity: var(${interactablePressedOpacity});
  }
`;

export type OnPress = React.MouseEventHandler;

export type LinkableProps = {
  /** Callback fired when the element is pressed. */
  onPress?: OnPress;
  /** URL that this links to when pressed. */
  to?: string;
} & Pick<React.AllHTMLAttributes<HTMLElement>, 'target' | 'href' | 'onKeyDown' | 'onKeyUp'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;

export type PressableProps = {
  /**
   * Necessary to control roving tabindex for accessibility
   * https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
   * */
  tabIndex?: number;
} & React.AriaAttributes &
  SharedProps &
  LinkableProps &
  ComponentEventHandlerProps &
  Pick<InteractableProps, 'loading' | 'focusable'>;

export type PressableInternalProps = {
  /** Element or component to render the container as. */
  as?: 'a' | 'button' | React.ComponentType<React.PropsWithChildren<any>>;
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
} & PressableProps &
  Omit<InteractableProps, 'as' | 'onClick' | 'onClickCapture' | 'pressed' | 'start'>;

export const Pressable = forwardRef(function Pressable(
  {
    as,
    children,
    className,
    loading,
    onPress,
    noScaleOnPress,
    tabIndex,
    eventConfig,
    focusable,
    background,
    ...props
  }: PressableInternalProps,
  ref: React.Ref<Element>,
) {
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
      ref={ref}
      aria-busy={loading}
      aria-disabled={undefined} // Reakit adds this prop, but it's bad practice - https://jira.coinbase-corp.com/browse/CDS-2392
      as={as ?? ButtonOrLink}
      background={background}
      className={cx(
        !noScaleOnPress && scaledDownStyle,
        resetStyle,
        className,
        loading && loadingStyle,
      )}
      focusable={focusable}
      loading={loading}
      onClick={onClick}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </Interactable>
  );
});
