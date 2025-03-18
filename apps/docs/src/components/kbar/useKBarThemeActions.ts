import { useMemo } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import decreasePriorityIfCategory from '@site/src/utils/decreasePriorityIfCategory';

export default function useKBarThemeActions() {
  const { setColorMode } = useColorMode();

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
            setColorMode('dark');
          },
        },
        {
          id: 'lightPreference',
          name: 'Light',
          keywords: 'light mode',
          parent: 'spectrumPreference',
          perform: () => {
            setColorMode('light');
          },
        },
      ].map(decreasePriorityIfCategory),
    [setColorMode],
  );
}
