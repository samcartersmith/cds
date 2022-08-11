import { useMemo } from 'react';

import { AccessibilityProps } from './useAccessibilityProps';

/**
 * This function checks whether the children node is a
 * string. If it is a string, then we use that children
 * as the accessibilityLabel and accessibleHint Value
 * @param param0
 * @returns
 */
export const useChildrenAsAccessibilityProps = ({
  children,
  accessibilityLabel,
  accessibilityHint,
}: { children: React.ReactNode } & AccessibilityProps) => {
  return useMemo(() => {
    return {
      accessibilityLabel:
        typeof children === 'string' && accessibilityLabel === undefined
          ? children
          : accessibilityLabel,
      accessibilityHint:
        typeof children === 'string' && accessibilityHint === undefined
          ? children
          : accessibilityHint,
    };
  }, [accessibilityHint, accessibilityLabel, children]);
};
