import { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import decreasePriorityIfCategory from '@site/src/utils/decreasePriorityIfCategory';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';

export default function useKBarThemeActions() {
  const { setColorMode } = useColorMode();
  const toast = useToast();
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
      ].map(decreasePriorityIfCategory),
    [setColorMode, toast],
  );
}
