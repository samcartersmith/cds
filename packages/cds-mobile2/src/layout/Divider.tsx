import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DividerBaseProps } from '@cbhq/cds-common2';

import { useTheme } from '../system';

import { Box, BoxProps } from './Box';

export type DividerProps = DividerBaseProps & BoxProps;

export const Divider = memo(function Divider({
  color = 'line',
  direction = 'horizontal',
  ...boxProps
}: DividerProps) {
  const theme = useTheme();
  const style = useMemo(
    () => [
      styles[direction],
      {
        backgroundColor: theme.color[color],
      },
    ],
    [direction, theme.color, color],
  );

  return (
    <Box alignItems="stretch" alignSelf="stretch" {...boxProps}>
      <View style={style} />
    </Box>
  );
});

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
