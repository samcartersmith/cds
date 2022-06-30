import React, { memo } from 'react';
import type { LandingPageFocusAreaGroupProps } from '@theme/LandingPageFocusAreaGroup';
import { CMSContent } from '@cb/cms';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextHeadline } from '@cbhq/cds-web/typography/TextHeadline';

const LandingPageFocusAreaGroup = memo(function LandingPageFocusAreaGroup({
  label,
  items,
}: LandingPageFocusAreaGroupProps) {
  return (
    <HStack key={label}>
      <Box width="25%">
        <TextHeadline as="p">{label}</TextHeadline>
      </Box>
      <VStack>
        <CMSContent content={items} />
      </VStack>
    </HStack>
  );
});

export default LandingPageFocusAreaGroup;
