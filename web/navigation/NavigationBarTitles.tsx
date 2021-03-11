import React, { memo } from 'react';

import { TextTitle3, TextLabel2 } from '../typography';
import { navbarSpacing, subtitleColor } from './navigationTokens';

export type NavigationBarTitlesProps = {
  title: string;
  subtitle?: string;
};

export const NavigationBarTitles = memo(({ title, subtitle }: NavigationBarTitlesProps) => {
  return (
    <>
      <TextTitle3 as="h1">{title}</TextTitle3>
      {subtitle && (
        <TextLabel2 as="span" color={subtitleColor} spacingStart={navbarSpacing.withinGroups}>
          {subtitle}
        </TextLabel2>
      )}
    </>
  );
});

NavigationBarTitles.displayName = 'NavigationBarTitles';
