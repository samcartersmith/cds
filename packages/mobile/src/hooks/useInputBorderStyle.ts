import { useEffect, useMemo } from 'react';
import { inputBorderWidth } from '@cbhq/cds-common/src/tokens/input';
import { InputVariant } from '@cbhq/cds-common/src/types/InputBaseProps';

import { useInputBorderAnimation } from './useInputBorderAnimation';

/**
 *
 * @param focused
 */
export const useInputBorderStyle = (
  focused: boolean,
  initialVariant: InputVariant,
  focusedVariant: InputVariant,
) => {
  const {
    animateInputBorderIn,
    animateInputBorderOut,
    focusedBorderRgba,
    unFocusedBorderRgba,
    focusedBorderOpacity,
  } = useInputBorderAnimation(initialVariant, focusedVariant);

  /** Border style for when input is not focused */
  const borderUnfocusedStyle = useMemo(() => {
    return {
      borderColor: focused ? focusedBorderRgba : unFocusedBorderRgba,
      borderWidth: inputBorderWidth,
    };
  }, [focused, focusedBorderRgba, unFocusedBorderRgba]);

  /** Border style for when input is focused */
  const borderFocusedStyle = useMemo(() => {
    return {
      opacity: focusedBorderOpacity,
      borderColor: focusedBorderRgba,
    };
  }, [focusedBorderOpacity, focusedBorderRgba]);

  useEffect(() => {
    if (focused) {
      animateInputBorderOut.stop();
      animateInputBorderIn.start();
    } else {
      animateInputBorderIn.stop();
      animateInputBorderOut.start();
    }
  }, [animateInputBorderIn, animateInputBorderOut, focused]);

  return useMemo(() => {
    return {
      borderUnfocusedStyle,
      borderFocusedStyle,
    };
  }, [borderUnfocusedStyle, borderFocusedStyle]);
};
