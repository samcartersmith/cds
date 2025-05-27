import { StyleSheet, ViewStyle } from 'react-native';
import { PinningDirection } from '@cbhq/cds-common/types/BoxBaseProps';

export const pinStyles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  all: StyleSheet.absoluteFillObject,
} satisfies Record<PinningDirection, ViewStyle>);
