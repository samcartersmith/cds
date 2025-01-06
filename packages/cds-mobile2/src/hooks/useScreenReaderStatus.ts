import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useToggler } from '@cbhq/cds-common2';

/**
 * Hook to track screen reader status and update when changed.
 *
 * @returns {boolean} isScreenReaderEnabled - Whether screen reader is enabled
 */

export const useScreenReaderStatus = () => {
  const [isScreenReaderEnabled, { toggleOn, toggleOff }] = useToggler(false);

  // initialize accessibility info on mount
  useEffect(() => {
    const initScreenReaderStatus = async () => {
      const enabled = await AccessibilityInfo.isScreenReaderEnabled();
      if (enabled) toggleOn();

      AccessibilityInfo.addEventListener('screenReaderChanged', (_isScreenReaderEnabled) => {
        if (_isScreenReaderEnabled) toggleOn();
        else toggleOff();
      });
    };

    void initScreenReaderStatus();
  }, [toggleOff, toggleOn]);

  return isScreenReaderEnabled;
};
