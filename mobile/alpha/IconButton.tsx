import React, { memo, useMemo } from 'react';
import { Scale } from '@cbhq/cds-common/types';
import { IconButtonBaseProps } from '@cbhq/cds-common/types/alpha';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { Icon } from '../icons/Icon';
import { Pressable, PressableProps, OnPress } from '../system/Pressable';
import { getSpacingStyles } from '../styles/getSpacingStyles';
import { getButtonSizeProps } from './getButtonSizeProps';
import { getButtonSpacingProps } from './getButtonSpacingProps';

export type IconButtonProps = IconButtonBaseProps<OnPress> & PressableProps;

type GetIconStylesParams = Pick<IconButtonProps, 'compact' | 'flush'> & {
  scale: Scale;
};

function getCacheKey({ compact, flush, scale }: GetIconStylesParams) {
  return `${compact}-${flush}-${scale}`;
}

const getIconStyles = memoize(function getIconStyles({
  compact,
  scale,
  flush,
}: GetIconStylesParams) {
  const { minHeight, iconSize } = getButtonSizeProps({ compact, scale });
  const { offsetHorizontal } = getButtonSpacingProps({
    compact,
    flush,
  });
  const spacingStyles = getSpacingStyles({ isInverted: true, horizontal: offsetHorizontal, scale });
  return {
    pressableStyles: {
      ...spacingStyles,
      height: minHeight,
      width: minHeight,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    iconSize,
  } as const;
},
getCacheKey);

export const IconButton = memo(function IconButton({
  compact = true,
  feedback = compact ? 'light' : 'normal',
  name,
  transparent,
  variant = 'secondary',
  flush,
  ...props
}: IconButtonProps) {
  const scale = useScale();
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const { pressableStyles, iconSize } = useMemo(
    () => getIconStyles({ compact, flush, scale }),
    [compact, flush, scale],
  );

  return (
    <Pressable
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius="round"
      borderWidth="button"
      feedback={feedback}
      style={pressableStyles}
      {...props}
    >
      <Icon name={name} size={iconSize} color={color} />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
