import { useMemo } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';

export type AriaHasPopupType = 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';

export type AccessibleControlledReturnType = {
  subjectAccessibilityProps?: {
    'aria-controls': string;
    'aria-haspopup': AriaHasPopupType;
  };
  contentAccessibilityProps: {
    id: string;
    accessibilityLabel?: string;
  };
};

/** hook that generates unique aria labels and attributes for subject that controls the visibility of content */
export const usePopoverA11y = (
  isVisible: boolean,
  isDropdown: boolean,
  accessibilityLabel?: string,
): AccessibleControlledReturnType => {
  const uniqueId = useMemo(() => generateRandomId(accessibilityLabel), [accessibilityLabel]);

  //   only add a11y props to the subject when the content is visible
  const subjectAccessibilityProps = useMemo(
    () =>
      isVisible
        ? {
            'aria-controls': uniqueId,
            'aria-haspopup': isDropdown ? 'menu' : ('dialog' as AriaHasPopupType),
          }
        : undefined,
    [isDropdown, isVisible, uniqueId],
  );

  const contentAccessibilityProps = useMemo(
    () => ({
      id: uniqueId,
      accessibilityLabel,
    }),
    [uniqueId, accessibilityLabel],
  );

  return {
    subjectAccessibilityProps,
    contentAccessibilityProps,
  };
};
