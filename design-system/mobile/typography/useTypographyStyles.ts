import { useMemo } from 'react';

import { Typography } from '@cbhq/cds-common';

import { Split } from 'type-fest';
import { useTypographyStylesMap } from './useTypographyStylesMap';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { fontFamily as fontFamilyTokens } from '../tokens';

type TypographyMap = ReturnType<typeof useTypographyStylesMap>;
type TypographyStyles = TypographyMap[keyof TypographyMap];
type FontFamily = TypographyStyles['fontFamily'];

function getMonoFont(fontFamily: FontFamily) {
  const [, weight] = fontFamily.split('-') as Split<FontFamily, '-'>;
  return `${fontFamilyTokens.mono}-${weight}` as const;
}

export const useTypographyStyles = (name: Typography, mono?: boolean) => {
  const typographyStyles = useTypographyStylesMap();
  const isFrontier = useFeatureFlag('frontierTypography');
  return useMemo(() => {
    const finalName = name === 'display2' && isFrontier ? 'display2Frontier' : name;
    const styles = typographyStyles[finalName];
    const fontFamily = mono ? getMonoFont(styles.fontFamily) : styles.fontFamily;
    return { ...typographyStyles[finalName], fontFamily };
  }, [name, isFrontier, typographyStyles, mono]);
};
