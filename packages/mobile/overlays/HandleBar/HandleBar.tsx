import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { handleBarHeight, handleBarOffset } from '@cbhq/cds-common/tokens/drawer';

import { usePalette } from '../../hooks/usePalette';
import { useSpacingScale } from '../../hooks/useSpacingScale';

export const HandleBar = (props: ViewProps) => {
  const colors = usePalette();
  const handleBarBackgroundColor = useSpectrumConditional({
    dark: colors.line,
    light: colors.backgroundAlternate,
  });
  const spacing = useSpacingScale();
  const handleBarStyles = {
    backgroundColor: handleBarBackgroundColor,
    marginBottom: spacing[2],
  };

  return (
    <View accessible style={styles.touchableArea} testID="handleBar" {...props}>
      <View style={[styles.handleBar, handleBarStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    position: 'absolute',
    top: -handleBarOffset,
    left: 0,
    right: 0,
    height: handleBarOffset,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  handleBar: {
    width: 64,
    height: handleBarHeight,
    borderRadius: 4,
  },
});

HandleBar.displayName = 'HandleBar';
