import { InputVariant } from '@cbhq/cds-common/types/InputBaseProps';
import { useEffect } from 'react';
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
  const { animateInputBorderIn, animateInputBorderOut, interpolatedValues } =
    useInputBorderAnimation(initialVariant, focusedVariant);

  useEffect(() => {
    if (focused) {
      animateInputBorderOut.stop();
      animateInputBorderIn.start();
    } else {
      animateInputBorderIn.stop();
      animateInputBorderOut.start();
    }
  }, [animateInputBorderIn, animateInputBorderOut, focused]);

  return interpolatedValues;
};
