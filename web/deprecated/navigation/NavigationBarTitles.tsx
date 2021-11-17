import React, { memo } from 'react';

import { HStack } from '../../layout/HStack';
import { TextTitle3, TextLabel2 } from '../../typography';
import { navbarSpacing, subtitleColor } from './navigationTokens';

export type NavigationBarTitlesProps = {
  title: string;
  subtitle?: string;
};

export const NavigationBarTitles = memo(({ title, subtitle }: NavigationBarTitlesProps) => {
  return (
    <HStack alignItems="baseline" spacingEnd={navbarSpacing.betweenGroups}>
      <TextTitle3 as="h1">{title}</TextTitle3>
      {subtitle && (
        <TextLabel2 as="span" color={subtitleColor} spacingStart={navbarSpacing.withinGroups}>
          {subtitle}
        </TextLabel2>
      )}
    </HStack>
  );
});

NavigationBarTitles.displayName = 'NavigationBarTitles';
