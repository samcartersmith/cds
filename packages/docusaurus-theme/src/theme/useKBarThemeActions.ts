import { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useToast } from '@cbhq/cds-web/overlays/useToast';

import decreasePriorityIfCategory from '../utils/decreasePriorityIfCategory';

export default function useKBarThemeActions() {
  const toast = useToast();
  const { setColorMode } = useColorMode();
  const setScale = useRootScalePreferenceUpdater();
  return useMemo(
    () =>
      [
        {
          id: 'spectrumPreference',
          name: 'Change color mode…',
          keywords: 'spectrum color dark light',
          section: 'Preferences',
        },
        {
          id: 'darkPreference',
          name: 'Dark',
          keywords: 'dark mode',
          parent: 'spectrumPreference',
          perform: () => {
            toast.show('Dark mode enabled', {
              action: {
                label: 'Undo',
                onPress: () => {
                  setColorMode('light');
                },
              },
            });
            setColorMode('dark');
          },
        },
        {
          id: 'lightPreference',
          name: 'Light',
          keywords: 'light mode',
          parent: 'spectrumPreference',
          perform: () => {
            toast.show('Light mode enabled', {
              action: {
                label: 'Undo',
                onPress: () => {
                  setColorMode('dark');
                },
              },
            });
            setColorMode('light');
          },
        },
        {
          id: 'scalePreference',
          name: 'Change scale density...',
          keywords: 'scale',
          section: 'Preferences',
        },
        {
          id: 'densePreference',
          name: 'Dense',
          parent: 'scalePreference',
          perform: () => {
            toast.show('Dense scale enabled', {
              action: {
                label: 'Undo',
                onPress: () => {
                  setScale('large');
                },
              },
            });
            setScale('xSmall');
          },
        },
        {
          id: 'normalPreference',
          name: 'Normal',
          parent: 'scalePreference',
          perform: () => {
            toast.show('Normal scale enabled', {
              action: {
                label: 'Undo',
                onPress: () => {
                  setScale('xSmall');
                },
              },
            });
            setScale('large');
          },
        },
      ].map(decreasePriorityIfCategory),
    [setColorMode, setScale, toast],
  );
}
