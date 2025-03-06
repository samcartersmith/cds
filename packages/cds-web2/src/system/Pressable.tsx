import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css, cx } from '@linaria/core';
import { useEventHandler } from '@cbhq/cds-common2/hooks/useEventHandler';
import { ComponentEventHandlerProps } from '@cbhq/cds-common2/types/ComponentEventHandlerProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';

import { Polymorphic } from '../core/polymorphism';
import { useIsoEffect } from '../hooks/useIsoEffect';

import { type InteractableBaseProps, Interactable } from './Interactable';
import {
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';
import {
  getTabIndex,
  handleButtonFocusOnSafariOrFirefoxOnMac,
  isNativeClick,
  isNativeTabbable,
  supportsDisabledAttribute,
} from './reakit-utils';

const scaledDownStyle = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active,
  &[data-active='true'] {
    transform: scale(0.98);
  }
`;

const baseStyle = css`
  &[data-active='true'] {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }

  &[data-loading='true'] {
    opacity: 1;
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }
`;

const transparentActiveStyle = css`
  &[data-active='true'] {
    background-color: var(--color-transparent);
  }
`;

export type LinkableProps = {
  /** Callback fired when the element is pressed. */
  onPress?: React.MouseEventHandler;
  /** URL that this links to when pressed. */
  to?: string;
} & Pick<React.AllHTMLAttributes<HTMLAnchorElement>, 'target' | 'href'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;

export type PressableBaseProps = Polymorphic.ExtendableProps<
  Omit<InteractableBaseProps, 'as'>,
  {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
  } & LinkableProps &
    ComponentEventHandlerProps
>;

export type PressableProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>;

type PressableComponent = (<AsComponent extends React.ElementType>(
  props: PressableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Pressable: PressableComponent = forwardRef<
  React.ReactElement<PressableBaseProps>,
  PressableBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      className,
      disabled,
      loading,
      onClickCapture,
      onPress,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseDownCapture,
      noScaleOnPress,
      tabIndex,
      eventConfig,
      analyticsId,
      focusable,
      to,
      href,
      rel,
      target,
      type,
      transparentWhilePressed,
      padding = 0,
      ...props
    }: PressableProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const elementRef = useRef(null);
    useImperativeHandle(ref, () => elementRef.current, []); // Merges forwarded ref with internal elementRef
    const isLink = to || href;
    const Component = (as ?? (isLink ? 'a' : 'button')) satisfies React.ElementType;
    const defaultButtonType = Component === 'button' ? 'button' : undefined;
    const [nativeTabbable, setNativeTabbable] = useState(true);
    const [supportsDisabled, setSupportsDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const isActiveRef = useRef(false);
    // Evaluate rendered element for computing appropriate accessibility attributes
    useIsoEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      if (!isNativeTabbable(element)) setNativeTabbable(false);
      if (!supportsDisabledAttribute(element)) setSupportsDisabled(false);
    }, []);

    // Handle Enter and Spacebar keydown events
    const handleOnKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);

        if (
          event.defaultPrevented ||
          disabled ||
          event.metaKey ||
          event.target !== event.currentTarget
        )
          return;

        const isEnter = event.key === 'Enter';
        const isSpace = event.key === ' ';

        if (isEnter || isSpace) {
          if (isNativeClick(event)) return;
          event.preventDefault();
          // Trigger a click on Enter keydown
          if (isEnter) event.currentTarget.click();
          // Set data-active attribute on Spacebar keydown, and prepare to trigger click on Spacebar keyup
          else if (isSpace && !isActiveRef.current) {
            isActiveRef.current = true;
            setActive(true);
          }
        }
      },
      [disabled, onKeyDown],
    );

    // Handle Spacebar keyup event
    const handleOnKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyUp?.(event);

        if (event.defaultPrevented || disabled || event.metaKey) return;

        // Remove data-active attribute on Spacebar keyup and trigger a click
        if (isActiveRef.current && event.key === ' ') {
          isActiveRef.current = false;
          setActive(false);
          event.currentTarget.click();
        }
      },
      [disabled, onKeyUp],
    );

    const handleOnClickCapture = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClickCapture?.(event);
        if (event.defaultPrevented) return;
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      [disabled, onClickCapture],
    );

    const handleOnMouseDownCapture = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseDownCapture?.(event);
        if (event.defaultPrevented) return;
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      [disabled, onMouseDownCapture],
    );

    // Handle Button focus on mousedown in Safari or Firefox on Mac browsers
    const handleOnMouseDown = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseDown?.(event);

        if (event.defaultPrevented) return;
        handleButtonFocusOnSafariOrFirefoxOnMac(event);
      },
      [onMouseDown],
    );

    const onEventHandler = useEventHandler('Button', 'onPress', eventConfig, analyticsId);
    const onClick = useCallback(
      (event: React.MouseEvent) => {
        onPress?.(event);
        onEventHandler();
      },
      [onPress, onEventHandler],
    );

    const accessibilityProps = useMemo(
      () => ({
        disabled: (disabled || loading) && supportsDisabled && !focusable ? true : undefined,
        'aria-disabled':
          (disabled || loading) && (!supportsDisabled || focusable) ? true : undefined,
        tabIndex: getTabIndex({ disabled, focusable, supportsDisabled, nativeTabbable, tabIndex }),
      }),
      [disabled, loading, focusable, supportsDisabled, nativeTabbable, tabIndex],
    );

    return (
      <Interactable
        ref={elementRef}
        as={Component}
        className={cx(
          baseStyle,
          !noScaleOnPress && scaledDownStyle,
          transparentWhilePressed && transparentActiveStyle,
          className,
        )}
        data-active={active || undefined}
        data-loading={loading || undefined}
        href={to ?? href}
        loading={loading}
        onClick={onClick}
        onClickCapture={handleOnClickCapture}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onMouseDown={handleOnMouseDown}
        onMouseDownCapture={handleOnMouseDownCapture}
        padding={padding}
        rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
        target={target}
        transparentWhilePressed={transparentWhilePressed}
        type={type ?? defaultButtonType}
        {...accessibilityProps}
        {...props}
      />
    );
  },
);
