import type { ColorScheme } from '../core/theme';
import { useTheme } from '../system/ThemeProvider';

export const useColorScheme = (): ColorScheme => {
  const theme = useTheme();
  return theme.metadata?.colorScheme ?? 'light';
};
