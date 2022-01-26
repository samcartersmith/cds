import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { PaletteForeground } from '@cbhq/cds-common';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';

import { usePalette } from '../hooks/usePalette';

import { IconProps } from './Icon';
import { iconGlyphMap } from './iconGlyphMap';

export type TextIconProps = Pick<IconProps, 'color' | 'size' | 'name' | 'testID'>;

/**
 *
 * This is a simplified, text-only version of the Icon component.
 * Nested text components need to all be RN Text and the Icon component has a box wrapper to handle border and badges.
 * Adheres to all the requirements for Nested Text on react native. https://reactnative.dev/docs/text#nested-text
 */
export const TextIcon = ({
  color = 'primary' as PaletteForeground,
  size,
  name,
  testID,
}: TextIconProps) => {
  const { iconSize } = useIconSize(size, false);
  const iconColor = usePalette()[color];

  const styles = useMemo(
    () => ({
      fontFamily: 'CoinbaseIcons',
      fontSize: iconSize,
      color: iconColor,
    }),
    [iconColor, iconSize],
  );

  if (name in iconGlyphMap && iconSize in iconGlyphMap[name]) {
    return (
      <Text testID={testID} allowFontScaling={false} style={styles}>
        {iconGlyphMap[name][iconSize]}
      </Text>
    );
  }
  return <>{null}</>;
};
