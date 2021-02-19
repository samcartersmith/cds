import { PinningDirection } from '@cds/common';
import { StyleSheet } from 'react-native';

export const usePinStyles = (pin?: PinningDirection) => {
  if (pin) {
    return styles[pin];
  }
};

const styles = StyleSheet.create({
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
});
