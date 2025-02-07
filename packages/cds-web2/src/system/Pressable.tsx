import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css, cx } from '@linaria/core';
import { getBlendedBackgroundColor } from '@cbhq/cds-common2/color/getBlendedBackgroundColor';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useEventHandler } from '@cbhq/cds-common2/hooks/useEventHandler';
import {
  accessibleOpacityDisabled,
  opacityHovered,
  opacityPressed,
} from '@cbhq/cds-common2/tokens/interactable';
import { ComponentEventHandlerProps } from '@cbhq/cds-common2/types/ComponentEventHandlerProps';
import { SharedAccessibilityProps } from '@cbhq/cds-common2/types/SharedAccessibilityProps';

import { Polymorphic } from '../core/polymorphism';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { useTheme } from '../hooks/useTheme';
import { type BoxBaseProps, Box } from '../layout/Box';

import {
  interactableBackground,
  interactableDisabledBackground,
  interactableHoveredBackground,
  interactableHoveredOpacity,
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

const focusRingStyle = css`
  position: relative;
  /* if we use the focus ring we need to turn off the browser stylesheet outline */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--color-bgPrimary);
  }
`;

const baseStyle = css`
  padding: 0;
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(${interactableBackground});

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: var(${interactableHoveredBackground});
    > * {
      opacity: var(${interactableHoveredOpacity});
    }
  }

  &:active,
  &[data-active='true'] {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }
  &:disabled,
  &[data-disabled='true'] {
    opacity: ${accessibleOpacityDisabled};
    cursor: default;
    pointer-events: none;
    touch-action: none;
    background-color: var(${interactableDisabledBackground});
  }
  &[data-loading='true'] {
    opacity: 1;
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }
  &[data-block='true'] {
    display: block;
    width: 100%;
  }
`;

const transparentActiveStyle = css`
  &:active,
  &[data-active='true'] {
    background-color: var(--color-transparent);
  }
`;

const transparentWhileInactiveStyle = css`
  background-color: transparent;
`;

export type OnPress = React.MouseEventHandler;

export type LinkableProps = {
  /** Callback fired when the element is pressed. */
  onPress?: OnPress;
  /** URL that this links to when pressed. */
  to?: string;
} & Pick<React.AllHTMLAttributes<HTMLAnchorElement>, 'target' | 'href'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  >;

export type PressableBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    children: NonNullable<React.ReactNode>;
    className?: string;
    focusable?: boolean;
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    /** Background color of the overlay (element being interacted with). */
    background: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element being interacted with. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
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
      background,
      block,
      borderColor = 'transparent',
      borderWidth = 100,
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
      pressed,
      style: customStyle,
      transparentWhileInactive,
      transparentWhilePressed,
      ...props
    }: PressableProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const theme = useTheme();
    const elementRef = useRef(null);
    useImperativeHandle(ref, () => elementRef.current, []); // Merges forwarded ref with internal elementRef
    const isLink = to || href;
    const Component: React.ElementType = as ?? (isLink ? 'a' : 'button');
    const defaultButtonType = Component === 'button' ? 'button' : undefined;
    const trulyDisabled = Boolean(disabled && !focusable);
    const [nativeTabbable, setNativeTabbable] = useState(true);
    const [supportsDisabled, setSupportsDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const isActiveRef = useRef(false);
    const shouldBeDisabled = (trulyDisabled && supportsDisabled) || loading;
    // Evaluate element to set state values used to compute appropriate tabIndex
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
        disabled: shouldBeDisabled ? true : undefined,
        'aria-disabled': !supportsDisabled && (disabled || loading) ? true : undefined, // add aria-disabled for elements that don't natively support the disabled attribute
        tabIndex: getTabIndex(trulyDisabled, nativeTabbable, supportsDisabled, tabIndex),
      }),
      [
        shouldBeDisabled,
        supportsDisabled,
        disabled,
        loading,
        trulyDisabled,
        nativeTabbable,
        tabIndex,
      ],
    );

    const style = useMemo(
      () => ({
        [interactableBackground]: `var(--color-${background})`,
        /**
         * Apply an interactive background style. Blend the color with the background or backgroundInverse values
         */
        // Hover:
        [interactableHoveredBackground]: getBlendedBackgroundColor({
          background,
          themeColor: theme.color,
          opacity: opacityHovered[100],
          colorScheme: theme.colorScheme,
        }),
        [interactableHoveredOpacity]: opacityHovered[100],
        // Pressed:
        [interactablePressedBackground]: getBlendedBackgroundColor({
          background,
          themeColor: theme.color,
          opacity: opacityPressed[100],
          colorScheme: theme.colorScheme,
        }),
        [interactablePressedOpacity]: opacityPressed[100],
        // Disabled:
        [interactableDisabledBackground]: getBlendedBackgroundColor({
          background,
          themeColor: theme.color,
          opacity: accessibleOpacityDisabled,
          colorScheme: theme.colorScheme,
          isDisabled: true,
        }),
        ...customStyle,
      }),
      [customStyle, background, theme],
    );

    return (
      <Box
        ref={elementRef}
        aria-busy={loading}
        aria-pressed={pressed}
        as={Component}
        background={background}
        borderColor={transparentWhileInactive ? 'transparent' : borderColor}
        borderWidth={borderWidth}
        className={cx(
          baseStyle,
          focusRingStyle,
          !noScaleOnPress && scaledDownStyle,
          // use transparent override prop to set styles for border and background
          transparentWhileInactive && transparentWhileInactiveStyle,
          transparentWhilePressed && transparentActiveStyle,
          className,
        )}
        data-active={active || undefined}
        data-block={block || undefined}
        data-disabled={shouldBeDisabled || undefined}
        data-loading={loading || undefined}
        href={to ?? href}
        onClick={onClick}
        onClickCapture={handleOnClickCapture}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onMouseDown={handleOnMouseDown}
        onMouseDownCapture={handleOnMouseDownCapture}
        rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
        style={style}
        target={target}
        type={type ?? defaultButtonType}
        {...accessibilityProps}
        {...props}
      />
    );
  },
);
