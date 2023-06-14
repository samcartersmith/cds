import { useCallback, useId, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

export const useTooltipState = () => {
  const [isHovered, { toggleOn: handleOnMouseEnter, toggleOff: toggleOffIsHovered }] =
    useToggler(false);
  const [isFocused, { toggleOn: handleOnFocus, toggleOff: toggleOffIsFocused }] = useToggler(false);
  const tooltipId = useId();

  const handleOnBlur = useCallback(() => {
    toggleOffIsFocused();
  }, [toggleOffIsFocused]);

  const handleOnMouseLeave = useCallback(() => {
    toggleOffIsHovered();
  }, [toggleOffIsHovered]);

  return useMemo(() => {
    return {
      isOpen: isHovered || isFocused,
      tooltipId,
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnFocus,
      handleOnBlur,
    };
  }, [
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isFocused,
    isHovered,
    tooltipId,
  ]);
};
