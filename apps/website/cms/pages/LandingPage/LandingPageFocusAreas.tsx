import React, { memo } from 'react';
import type { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';

import { LandingPageFocusAreaGroupProps } from './LandingPageFocusAreaGroup';

export type FocusAreaSectionFields = {
  label: string;
  focusAreas: Entry<LandingPageFocusAreaGroupProps>[];
};

const LandingPageFocusAreas = memo(function LandingPageFocusAreas({
  label,
  focusAreas,
}: FocusAreaSectionFields) {
  return (
    <HStack minHeight={600}>
      <Box spacing={gutter} width="50%" borderedEnd>
        <h3 className="project-categories-title">{label}</h3>
      </Box>
      <VStack spacing={gutter} gap={gutter} width="50%">
        <CMSContent content={focusAreas} />
      </VStack>
    </HStack>
  );
});

export default LandingPageFocusAreas;
