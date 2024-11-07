import { useMemo } from 'react';
import { Split } from 'type-fest';
import { Typography } from '@cbhq/cds-common';

import { fontFamily as fontFamilyTokens } from '../tokens';

import { useTypographyStylesMap } from './useTypographyStylesMap';

type TypographyMap = ReturnType<typeof useTypographyStylesMap>;
type TypographyStyles = TypographyMap[keyof TypographyMap];
type FontFamily = TypographyStyles['fontFamily'];

function getMonoFont(fontFamily: FontFamily) {
  const [, weight] = fontFamily.split('-') as Split<FontFamily, '-'>;
  return `${fontFamilyTokens.mono}-${weight}` as const;
}

export const useTypographyStyles = (name: Typography, mono?: boolean) => {
  const typographyStyles = useTypographyStylesMap();
  return useMemo(() => {
    const styles = typographyStyles[name];
    const fontFamily = mono ? getMonoFont(styles.fontFamily) : styles.fontFamily;
    return { ...typographyStyles[name], fontFamily };
  }, [name, typographyStyles, mono]);
};
