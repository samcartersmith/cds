/* eslint-disable react-native/no-unused-styles */

import { useMemo } from 'react';

import { DividerBaseProps } from '@cbhq/cds-common';
import { StyleSheet, View } from 'react-native';

import { usePalette } from '../hooks/usePalette';
import { Box, BoxProps } from './Box';

export interface DividerProps extends DividerBaseProps, BoxProps {}

export const Divider = ({
  color = 'line',
  direction = 'horizontal',
  ...boxProps
}: DividerProps) => {
  const palette = usePalette();
  const style = useMemo(
    () => [
      styles[direction],
      {
        backgroundColor: palette[color],
      },
    ],
    [direction, palette, color]
  );

  return (
    <Box
      height={direction === 'vertical' ? '100%' : undefined}
      width={direction === 'horizontal' ? '100%' : undefined}
      {...boxProps}
    >
      <View style={style} />
    </Box>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});
