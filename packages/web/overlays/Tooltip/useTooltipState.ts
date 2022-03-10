import { useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { TimingReturnValues } from '../../animation/Animated';

export const useTooltipState = (animateOut: TimingReturnValues) => {
  const [isHovered, { toggleOn: handleOnMouseEnter, toggleOff: toggleOffIsHovered }] =
    useToggler(false);
  const [isFocused, { toggleOn: handleOnFocus, toggleOff: toggleOffIsFocused }] = useToggler(false);

  const handleOnBlur = useCallback(() => {
    void animateOut.start(() => toggleOffIsFocused());
  }, [animateOut, toggleOffIsFocused]);

  const handleOnMouseLeave = useCallback(() => {
    void animateOut.start(() => toggleOffIsHovered());
  }, [animateOut, toggleOffIsHovered]);

  return useMemo(() => {
    return {
      isOpen: isHovered || isFocused,
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnFocus,
      handleOnBlur,
    };
  }, [handleOnBlur, handleOnFocus, handleOnMouseEnter, handleOnMouseLeave, isFocused, isHovered]);
};
