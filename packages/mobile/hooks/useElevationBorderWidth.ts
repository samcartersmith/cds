import { Platform } from 'react-native';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

export const useElevationBorderWidth = (): 'card' | undefined => {
  return Platform.select({
    ios: 'card',
    // Guarantee border is hidden on android unless dark mode
    android: useSpectrumConditional({
      light: undefined,
      dark: 'card',
    }),
  });
};
