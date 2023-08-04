import { useCallback, useMemo } from 'react';
// eslint-disable-next-line @cbhq/react-native-no-fabric-incompatible-apis
import { AccessibilityInfo, findNodeHandle } from 'react-native';

/*
 * Custom hook to provide accessibility utilities.
 *
 * Returns:
 * - setA11yFocus: Sets accessibility focus to a given ref's node handle.
 * - announceForA11y: Announces text for screen readers.
 *
 * Usage:
 *
 * const { setA11yFocus, announceForA11y } = useA11y();
 *
 * setA11yFocus(myRef);
 * announceForA11y('Text to announce');
 *
 */
export const useA11y = () => {
  const setA11yFocus = useCallback((ref: React.MutableRefObject<null>) => {
    // TODO: Migrate this to fabric supported API
    const reactTag = findNodeHandle(ref.current);
    if (reactTag) {
      AccessibilityInfo.setAccessibilityFocus(reactTag);
    }
  }, []);

  const announceForA11y = useCallback((text: string) => {
    if (text) {
      AccessibilityInfo.announceForAccessibility(text);
    }
  }, []);

  return useMemo(
    () => ({
      setA11yFocus,
      announceForA11y,
    }),
    [setA11yFocus, announceForA11y],
  );
};
