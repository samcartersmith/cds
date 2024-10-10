import React, { memo, useMemo } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useScale } from '@cbhq/cds-common/scale/useScale';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { IconButtonBaseProps, Scale } from '@cbhq/cds-common/types';
import { getButtonSizeProps } from '@cbhq/cds-common/utils/getButtonSizeProps';
import { getButtonSpacingProps } from '@cbhq/cds-common/utils/getButtonSpacingProps';
import { memoize } from '@cbhq/cds-common/utils/memoize';

import { Icon } from '../icons/Icon';
import { getSpacingStyles } from '../styles/getSpacingStyles';
import { Pressable, PressableProps } from '../system/Pressable';

export type IconButtonProps = IconButtonBaseProps &
  PressableProps & {
    style?: StyleProp<ViewStyle>;
  };

type GetIconStylesParams = Pick<IconButtonProps, 'compact' | 'flush'> & {
  scale: Scale;
  compactSize: string;
};

function getCacheKey({ compact, flush, scale }: GetIconStylesParams) {
  return `${compact}-${flush}-${scale}`;
}

const getIconStyles = memoize(function getIconStyles({
  compact,
  scale,
  flush,
  compactSize,
}: GetIconStylesParams) {
  const { minHeight, iconSize } = getButtonSizeProps({ compact, scale, compactSize });
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
  style,
  ...props
}: IconButtonProps) {
  const scale = useScale();
  const compactSize = useScaleConditional({ dense: 'm', normal: 's' });

  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const { pressableStyles, iconSize, iconStyles } = useMemo(
    () => getIconStyles({ compact, flush, scale, compactSize }),
    [compact, compactSize, flush, scale],
  );

  const pressableStyle = useMemo(() => [pressableStyles, style], [pressableStyles, style]);

  return (
    <Pressable
      background={backgroundColor}
      borderColor={borderColor}
      borderRadius="roundedFull"
      borderWidth="button"
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
