import React, { memo, useMemo } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useButtonVariant } from '@cbhq/cds-common2/hooks/useButtonVariant';
import { IconButtonBaseProps } from '@cbhq/cds-common2/types';
import { getButtonSizeProps } from '@cbhq/cds-common2/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common2/utils/getButtonSpacingProps';
import { memoize } from '@cbhq/cds-common2/utils/memoize';

import { Theme } from '../core/theme';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableInternalProps } from '../system/Pressable';

export type IconButtonProps = IconButtonBaseProps &
  Omit<PressableInternalProps, 'background' | 'style'> & {
    style?: StyleProp<ViewStyle>;
    /** Background color of the icon button. */
    background?: ThemeVars.Color;
  };

type GetIconStylesParams = Pick<IconButtonProps, 'compact' | 'flush'> & {
  compactSize: string;
  theme: Theme;
};

function getCacheKey({ compact, flush }: GetIconStylesParams) {
  return `${compact}-${flush}`;
}

const getIconStyles = memoize(function getIconStyles({
  compact,
  flush,
  compactSize,
  theme,
}: GetIconStylesParams) {
  const { minHeight, iconSize } = getButtonSizeProps({ compact, compactSize });
  const { offsetEnd, offsetStart } = getButtonSpacingProps({
    compact,
    flush,
  });
  const spacingStyles = {
    marginStart: offsetStart ? -theme.space[offsetStart] : undefined,
    marginEnd: offsetEnd ? -theme.space[offsetEnd] : undefined,
  };
  const sizingStyles = {
    height: minHeight,
    width: minHeight,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  } as const;
  return {
    pressableStyles: {
      ...spacingStyles,
      ...sizingStyles,
    },
    iconStyles: sizingStyles,
    iconSize,
  } as const;
},
getCacheKey);

export const IconButton = memo(function IconButton({
  background,
  borderRadius = 1000,
  borderWidth = 100,
  color: customColor,
  compact = true,
  feedback = compact ? 'light' : 'normal',
  name,
  transparent,
  variant = 'secondary',
  flush,
  style,
  ...props
}: IconButtonProps) {
  const theme = useTheme();
  const {
    color: foregroundColor,
    backgroundColor,
    borderColor,
  } = useButtonVariant(variant, transparent);

  const color = customColor ?? foregroundColor;

  const { pressableStyles, iconSize, iconStyles } = useMemo(
    () => getIconStyles({ compact, flush, compactSize: 's', theme }),
    [compact, flush, theme],
  );

  const pressableStyle = useMemo(() => [pressableStyles, style], [pressableStyles, style]);

  return (
    <Pressable
      background={background ?? backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      feedback={feedback}
      style={pressableStyle}
      transparentWhileInactive={transparent}
      {...props}
    >
      <Icon color={color} name={name} size={iconSize} style={iconStyles} />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
