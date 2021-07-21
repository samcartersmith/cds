/* eslint-disable react-native/no-unused-styles */

import React, { useMemo } from 'react';

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
    [direction, palette, color],
  );

  return (
    <Box alignSelf="stretch" alignItems="stretch" {...boxProps}>
      <View style={style} />
    </Box>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    flexGrow: 1,
  },
  vertical: {
    width: 1,
    flexGrow: 1,
  },
});
