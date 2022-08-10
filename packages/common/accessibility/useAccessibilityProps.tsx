import { isValidElement, ReactNode, useMemo } from 'react';

type AccessibilityProps = {
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

/**
 * Given a React Node, obtain the accessibilityLabel and accessibilityHint.
 * If an accessibilityHint/accessibilityLabel is given in the node, it will use that. Otherwise, it will use accessibilityProps given in the second parameter
 * If that is not given either, it will set it as undefined.
 * @param node - A ReactNode
 * @param accessibilityProps - An object containing custom accessibiltiyProps
 * @returns an object { accessibilityLabel: '', accessibilityHint: '' }
 */
export const useAccessibilityProps = (node: ReactNode, accessibilityProps?: AccessibilityProps) => {
  return useMemo(() => {
    const accessibilityLabel = accessibilityProps?.accessibilityLabel;
    const accessibilityHint = accessibilityProps?.accessibilityHint;

    if (isValidElement(node)) {
      return {
        accessibilityLabel: (node.props.accessibilityLabel as string) ?? accessibilityLabel,
        accessibilityHint: (node.props.accessibilityHint as string) ?? accessibilityHint,
      };
    }

    return {
      accessibilityLabel,
      accessibilityHint,
    };
  }, [accessibilityProps?.accessibilityHint, accessibilityProps?.accessibilityLabel, node]);
};
