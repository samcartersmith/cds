import React, { memo } from 'react';

import { HStack } from '../../layout/HStack';
import { TextLabel2, TextTitle3 } from '../../typography';

import { navbarSpacing, subtitleColor } from './navigationTokens';

/** @deprecated */
export type NavigationBarTitlesProps = {
  title: string;
  subtitle?: string;
};

/** @deprecated */
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
