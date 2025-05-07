import React, { memo, useCallback, useMemo } from 'react';
import type { PressableStateCallbackType, ViewStyle } from 'react-native';
import { transparentVariants, variants } from '@cbhq/cds-common2/tokens/button';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import type { IconButtonVariant, IconName, SharedProps } from '@cbhq/cds-common2/types';
import { getButtonSpacingProps } from '@cbhq/cds-common2/utils/getButtonSpacingProps';

import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

export type IconButtonBaseProps = SharedProps &
  Omit<PressableBaseProps, 'children'> &
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  };

export type IconButtonProps = IconButtonBaseProps;

export const IconButton = memo(function IconButton({
  name,
  variant = 'secondary',
  transparent,
  compact = true,
  background,
  color,
  borderColor,
  borderWidth = 100,
  borderRadius = 1000,
  feedback = compact ? 'light' : 'normal',
  flush,
  style,
  ...props
}: IconButtonProps) {
  const iconSize = compact ? 's' : 'm';

  const variantMap = transparent ? transparentVariants : variants;
  const variantStyle = variantMap[variant];

  const colorValue = color ?? variantStyle.color;
  const backgroundValue = background ?? variantStyle.background;
  const borderColorValue = borderColor ?? variantStyle.borderColor;

  const minHeight = interactableHeight[compact ? 'compact' : 'regular'];

  const { marginStart, marginEnd } = getButtonSpacingProps({ compact, flush });

  const sizingStyle = useMemo<ViewStyle>(
    () => ({
      height: minHeight,
      width: minHeight,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    }),
    [minHeight],
  );

  const pressableStyle = useCallback(
    (state: PressableStateCallbackType) => [
      sizingStyle,
      typeof style === 'function' ? style(state) : style,
    ],
    [sizingStyle, style],
  );

  return (
    <Pressable
      background={backgroundValue}
      borderColor={borderColorValue}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      feedback={feedback}
      marginEnd={marginEnd}
      marginStart={marginStart}
      style={pressableStyle}
      transparentWhileInactive={transparent}
      {...props}
    >
      {/* TO DO: test using currentColor like web2 does on Icon here */}
      <Icon color={colorValue} name={name} size={iconSize} style={sizingStyle} />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
