import { useToggler } from '@cbhq/cds-common';
import { useCallback, useMemo } from 'react';

export const useTooltipState = () => {
  const [isHovered, { toggleOn: handleOnMouseEnter, toggleOff: toggleOffIsHovered }] =
    useToggler(false);
  const [isFocused, { toggleOn: handleOnFocus, toggleOff: handleOnBlur }] = useToggler(false);

  const handleOnMouseLeave = useCallback(() => {
    toggleOffIsHovered();
    handleOnBlur();
  }, [handleOnBlur, toggleOffIsHovered]);

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
