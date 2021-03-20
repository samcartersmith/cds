import React, { memo } from 'react';

import { SpacingScale } from '@cbhq/cds-common';

import { Box } from '../layout/Box';
import { TextDisplay1, TextTitle1 } from '../typography';
import { displayTitleSpacing, subtitleColor } from './navigationTokens';

export type NavigationDisplayTitleProps = {
  title: string;
  subtitle?: string;
  spacingBottom?: SpacingScale;
};

export const NavigationDisplayTitle = memo(
  ({ title, subtitle, spacingBottom }: NavigationDisplayTitleProps) => {
    return (
      <Box alignItems="baseline" spacingBottom={spacingBottom}>
        <TextDisplay1 as="h1">{title}</TextDisplay1>
        {subtitle && (
          <TextTitle1 as="h3" spacingStart={displayTitleSpacing.withinGroups} color={subtitleColor}>
            {subtitle}
          </TextTitle1>
        )}
      </Box>
    );
  }
);

NavigationDisplayTitle.displayName = 'NavigationDisplayTitle';
