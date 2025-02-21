import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import { useButtonVariant } from '@cbhq/cds-common2/hooks/useButtonVariant';
import { IconName } from '@cbhq/cds-common2/types/IconName';

import type { Polymorphic } from '../core/polymorphism';
import { Icon } from '../icons/Icon';
import { type PressableBaseProps, Pressable } from '../system/Pressable';

export const iconButtonDefaultElement = 'button';

export type IconButtonDefaultElement = typeof iconButtonDefaultElement;

export type IconButtonVariant = 'primary' | 'secondary' | 'foregroundMuted';

export type IconButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'background' | 'children'>,
  {
    /** Reduce the inner padding within the button itself. */
    compact?: boolean;
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
    /** Ensure the button aligns flush on the left or right.
     * This prop will translate the entire button left/right,
     * so take care to ensure it is not overflowing awkwardly
     */
    flush?: 'start' | 'end';
    /** Mark the button as loading and display a spinner. */
    loading?: boolean;
    /** Mark the button as disabled. */
    disabled?: boolean;
    /** Mark the background and border as transparent until interacted with. */
    transparent?: boolean;
  }
>;

export type IconButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  IconButtonBaseProps
>;

type IconButtonComponent = (<AsComponent extends React.ElementType>(
  props: IconButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const flushSpaceStyle = css`
  min-width: unset;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
`;
const flushStartStyle = css`
  margin-left: calc(var(--space-2) * -1);

  &:dir(rtl) {
    margin-right: calc(var(--space-2) * -1);
  }
`;
const flushEndStyle = css`
  margin-right: calc(var(--space-2) * -1);

  &:dir(rtl) {
    margin-left: calc(var(--space-2) * -1);
  }
`;

export const IconButton: IconButtonComponent = memo(
  forwardRef<React.ReactElement<IconButtonBaseProps>, IconButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        alignItems = 'center',
        background,
        borderRadius = 1000,
        borderWidth = 100,
        color,
        compact = true,
        className,
        name,
        disabled,
        transparent,
        variant = 'secondary',
        justifyContent = 'center',
        flush,
        height = compact ? 40 : 56,
        width = compact ? 40 : 56,
        onPress,
        ...props
      }: IconButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const iconSize = compact ? 's' : 'm';
      const {
        color: foregroundColor,
        backgroundColor,
        borderColor,
      } = useButtonVariant(variant, transparent);

      return (
        <Pressable
          ref={ref}
          alignItems={alignItems}
          as={as satisfies React.ElementType | undefined}
          background={background ?? backgroundColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={cx(
            flush && flushSpaceStyle,
            flush === 'start' && flushStartStyle,
            flush === 'end' && flushEndStyle,
            className,
          )}
          color={color ?? foregroundColor}
          disabled={disabled}
          height={height}
          justifyContent={justifyContent}
          onPress={onPress}
          transparentWhileInactive={transparent}
          width={width}
          {...props}
        >
          <Icon color="currentColor" name={name} size={iconSize} />
        </Pressable>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';
