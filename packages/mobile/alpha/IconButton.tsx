import React, { memo, useMemo } from 'react';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { Scale } from '@cbhq/cds-common/types';
import { IconButtonBaseProps } from '@cbhq/cds-common/types/alpha';
import { getButtonSizeProps } from '@cbhq/cds-common/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { Icon } from '../icons/Icon';
import { getSpacingStyles } from '../styles/getSpacingStyles';
import { OnPress, Pressable, PressableProps } from '../system/Pressable';

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
  const { offsetEnd, offsetStart } = getButtonSpacingProps({
    compact,
    flush,
  });
  const spacingStyles = getSpacingStyles({
    isInverted: true,
    end: offsetEnd,
    start: offsetStart,
    scale,
  });
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
  const { pressableStyles, iconSize, iconStyles } = useMemo(
    () => getIconStyles({ compact, flush, scale }),
    [compact, flush, scale],
  );

  return (
    <Pressable
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius="roundedFull"
      borderWidth="button"
      feedback={feedback}
      style={pressableStyles}
      transparentWhileInactive={transparent}
      {...props}
    >
      <Icon color={color} dangerouslySetStyle={iconStyles} name={name} size={iconSize} />
    </Pressable>
  );
});

IconButton.displayName = 'IconButton';
