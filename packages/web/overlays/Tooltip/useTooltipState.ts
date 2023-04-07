import { useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { generateRandomId } from '@cbhq/cds-utils';

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const useTooltipState = (id?: string) => {
  const [isHovered, { toggleOn: handleOnMouseEnter, toggleOff: toggleOffIsHovered }] =
    useToggler(false);
  const [isFocused, { toggleOn: handleOnFocus, toggleOff: toggleOffIsFocused }] = useToggler(false);
  const tooltipId = useMemo(() => id ?? generateRandomId('tooltip--'), [id]);

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
