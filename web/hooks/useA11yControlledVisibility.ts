import { useMemo } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';

/** hook that generates unique aria labels and attributes for trigger element that controls the visibility of another controlled element */
export const useA11yControlledVisibility = (isVisible: boolean, accessibilityLabel?: string) => {
  const uniqueId = generateRandomId(accessibilityLabel);

  const triggerAccessibilityProps = useMemo(
    () => ({
      'aria-expanded': isVisible,
      'aria-controls': uniqueId,
      'aria-haspopup': 'dialog',
    }),
    [isVisible, uniqueId],
  );

  const controlledElementAccessibilityProps = useMemo(
    () => ({
      id: uniqueId,
      accessibilityLabel,
    }),
    [uniqueId, accessibilityLabel],
  );

  return {
    triggerAccessibilityProps,
    controlledElementAccessibilityProps,
  };
};
