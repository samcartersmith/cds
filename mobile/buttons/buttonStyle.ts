import { borderRadius, borderWidth } from '@cbhq/cds-common/tokens/border';
import { opacityDisabled } from '@cbhq/cds-common/tokens/interactableOpacity';
import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 56,
    borderWidth: borderWidth.button,
    borderRadius: borderRadius.standard,
    borderStyle: 'solid',
  },
  buttonCompact: {
    borderRadius: borderRadius.compact,
    width: 'auto',
    height: 36,
  },
  inline: {
    width: 'auto',
    minWidth: 64,
  },
  block: {
    width: '100%',
    maxWidth: '100%',
  },
  disabled: {
    opacity: opacityDisabled,
  },
  pressable: {
    borderRadius: borderRadius.standard,
    overflow: 'hidden',
  },
  pressableCompact: {
    borderRadius: borderRadius.compact,
    overflow: 'hidden',
  },
});
