import { useMemo } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';

import { useTheme } from '../system';

function getMonoFont(fontFamily: string) {
  const [, weight] = fontFamily.split('-');
  return `CoinbaseMono-${weight}` as const;
}

export const useTypographyStyles = (name: ThemeVars.FontFamily, mono?: boolean) => {
  const theme = useTheme();

  return useMemo(() => {
    const fontFamily = theme.fontFamily[name];
    return {
      fontFamily: mono ? getMonoFont(fontFamily) : fontFamily,
      fontSize: theme.fontSize[name],
      fontWeight: theme.fontWeight[name],
      lineHeight: theme.lineHeight[name],
    };
  }, [name, mono, theme]);
};
