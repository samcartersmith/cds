import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { transparentVariants, variants } from '@cbhq/cds-common/tokens/button';
import type {
  ButtonVariant,
  IconName,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common/types';

import type { Polymorphic } from '../core/polymorphism';
import { Icon } from '../icons/Icon';
import { Spinner } from '../loaders/Spinner';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

export const spinnerHeight = 2.5;

const baseStyle = css`
  min-width: 100px;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  text-decoration: none;
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 0;
  position: relative;
  white-space: nowrap;
  appearance: none;
  outline: 0;
  overflow: visible;
  text-transform: none;
`;

const blockStyle = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

const compactStyle = css`
  min-width: auto;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
`;

const spinnerContainerStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const startNodeStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-inline-end: var(--space-1);
`;

const endNodeStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-end;
  margin-inline-start: var(--space-1);
`;

const iconStyle = css`
  justify-content: space-between;
`;

const unsetNoWrapStyle = css`
  white-space: unset;
`;

const hiddenStyle = css`
  visibility: hidden;
`;

const middleNodeStyle = css`
  position: relative;
`;

const flushSpaceStyle = css`
  min-width: unset;
  margin-inline-start: var(--space-2);
  margin-inline-end: var(--space-2);
`;

const flushStartStyle = css`
  margin-inline-start: calc(var(--space-2) * -1);
`;

const flushEndStyle = css`
  margin-inline-end: calc(var(--space-2) * -1);
`;

const spinnerStyle = {
  width: '24px',
  height: '24px',
  border: '2px solid',
  borderTopColor: 'var(--color-transparent)',
  borderRightColor: 'var(--color-transparent)',
  borderLeftColor: 'var(--color-transparent)',
};

export const buttonDefaultElement = 'button';

export type ButtonDefaultElement = typeof buttonDefaultElement;

export type ButtonBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>;

export type ButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ButtonBaseProps
>;

type ButtonComponent = (<AsComponent extends React.ElementType = ButtonDefaultElement>(
  props: ButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Button: ButtonComponent = memo(
  forwardRef<React.ReactElement<ButtonBaseProps>, ButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        variant = 'primary',
        loading,
        transparent,
        block,
        compact,
        children,
        start,
        startIcon,
        end,
        endIcon,
        flush,
        noScaleOnPress,
        numberOfLines,
        background,
        color,
        className,
        // TO DO: get rid of this height and interactableHeight (mobile and web both)
        height = compact ? 40 : 56,
        borderColor,
        borderWidth = 100,
        borderRadius = compact ? 700 : 900,
        accessibilityLabel,
        ...props
      }: ButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? buttonDefaultElement) satisfies React.ElementType;
      const iconSize = compact ? 's' : 'm';
      const hasIcon = Boolean(startIcon ?? endIcon);

      const variantMap = transparent ? transparentVariants : variants;
      const variantStyle = variantMap[variant];

      const colorValue = color ?? variantStyle.color;
      const backgroundValue = background ?? variantStyle.background;
      const borderColorValue = borderColor ?? variantStyle.borderColor;

      return (
        <Pressable
          ref={ref}
          aria-label={accessibilityLabel ?? (loading ? 'Loading' : undefined)}
          as={Component}
          background={backgroundValue}
          borderColor={borderColorValue}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={cx(
            baseStyle,
            compact && compactStyle,
            numberOfLines && unsetNoWrapStyle,
            hasIcon && iconStyle,
            block && blockStyle,
            flush && flushSpaceStyle,
            flush === 'start' && flushStartStyle,
            flush === 'end' && flushEndStyle,
            className,
          )}
          color={colorValue}
          height={height}
          loading={loading}
          noScaleOnPress={noScaleOnPress}
          transparentWhileInactive={transparent}
          {...props}
        >
          {start ? (
            <span className={startNodeStyle}>{start}</span>
          ) : startIcon ? (
            <span className={startNodeStyle}>
              <Icon color="currentColor" name={startIcon} size={iconSize} />
            </span>
          ) : null}

          <span className={middleNodeStyle}>
            {loading && (
              <span className={spinnerContainerStyle}>
                <Spinner color="currentColor" size={spinnerHeight} style={spinnerStyle} />
              </span>
            )}
            <Text
              color="currentColor"
              display="inline"
              font="headline"
              numberOfLines={numberOfLines}
            >
              <span className={cx(loading && hiddenStyle)}>{children}</span>
            </Text>
          </span>

          {end ? (
            <span className={endNodeStyle}>{end}</span>
          ) : endIcon ? (
            <span className={endNodeStyle}>
              <Icon color="currentColor" name={endIcon} size={iconSize} />
            </span>
          ) : null}
        </Pressable>
      );
    },
  ),
);
