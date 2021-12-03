import React, { View, ViewStyle } from 'react-native';
import { memo } from 'react';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { useDotPlacementStyles } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';
import { dotOuterContainerStyles, dotCountContent } from '@cbhq/cds-common/tokens/dot';
import { usePalette } from '../hooks/usePalette';
import { TextCaption } from '../typography/TextCaption';
import { dotStyles } from './dotStyles';

export const DotCount = memo(
  ({ children, placement, variant, count, ...props }: DotCountBaseProps) => {
    const palette = usePalette();
    const placementStyles = useDotPlacementStyles('mobile', placement) as ViewStyle;

    return (
      <View style={!!children && dotStyles.dotRootContainerStyles} {...props}>
        {children}
        <View
          testID="dot-outer-container-test-id"
          style={[
            placementStyles,
            dotOuterContainerStyles as ViewStyle,
            dotCountContent as ViewStyle,
            { backgroundColor: palette[variant] },
          ]}
        >
          <TextCaption color="primaryForeground">{parseDotCountMaxOverflow(count)}</TextCaption>
        </View>
      </View>
    );
  },
);
