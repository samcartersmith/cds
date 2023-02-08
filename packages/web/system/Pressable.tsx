import React, { forwardRef, useCallback } from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';
import { ComponentEventHandlerProps } from '@cbhq/cds-common/types/ComponentEventHandlerProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';

import { cx } from '../utils/linaria';

import { ButtonOrLink } from './ButtonOrLink';
import { Interactable, InteractableProps } from './Interactable';
import {
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';

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

const loadingStyles = css`
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
  /** Callback fired when a key is pressed */
  onKeyPress?: React.KeyboardEventHandler;
  /** URL that this links to when pressed. */
  to?: string;
} & Pick<React.AllHTMLAttributes<HTMLAnchorElement>, 'target' | 'href'> &
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
  Pick<InteractableProps, 'loading'>;

export type PressableInternalProps = {
  /** Element or component to render the container as. */
  as?:
    | 'a'
    | 'button'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<React.PropsWithChildren<any>>;
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
} & PressableProps &
  Omit<InteractableProps, 'as' | 'onClick' | 'onClickCapture' | 'pressed'>;

export const Pressable = forwardRef(function Pressable(
  {
    as,
    children,
    className,
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
      as={as ?? ButtonOrLink}
      onClick={onClick}
      onKeyPress={onKeyPress}
      {...props}
      className={cx(
        !noScaleOnPress && scaledDownState,
        className,
        resetStyles,
        loading && loadingStyles,
      )}
      // Reakit adds this prop, but it's bad practice - https://jira.coinbase-corp.com/browse/CDS-2392
      aria-disabled={undefined}
      ref={ref}
      tabIndex={tabIndex}
      loading={loading}
    >
      {children}
    </Interactable>
  );
});
