import { useMemo } from 'react';
import React, { View, ViewStyle } from 'react-native';
import { DotBaseProps } from '@cbhq/cds-common/types/DotBaseProps';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { borderRadius } from '@cbhq/cds-common/tokens/border';
import { useIconSize } from '@cbhq/cds-common';
import { dotOuterContainerStyles } from '@cbhq/cds-common/tokens/dot';
import { usePalette } from '../hooks/usePalette';
import { dotStyles } from './dotStyles';

export const DotStatusColor = ({
  variant,
  placement,
  size = 's',
  children,
  ...props
}: DotBaseProps) => {
  const palette = usePalette();
  const { iconSize } = useIconSize(size);

  const placementStyles = useDotPlacementStyles(placement) as ViewStyle;

  const dotContentStyles: ViewStyle = useMemo(() => {
    return {
      borderRadius: borderRadius.round,
      width: iconSize,
      height: iconSize,
      backgroundColor: palette[variant],
    };
  }, [iconSize, palette, variant]);

  return (
    <View style={Boolean(children) && dotStyles.dotRootContainerStyles} {...props}>
      {children}
      <View style={[placementStyles, dotOuterContainerStyles as ViewStyle, dotContentStyles]} />
    </View>
  );
};
