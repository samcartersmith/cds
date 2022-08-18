import React, { memo } from 'react';
import type { Entry } from 'contentful';
import { CMSContent } from '@cb/cms';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextHeadline } from '@cbhq/cds-web/typography/TextHeadline';

import { LandingPageFocusAreaItemProps } from './LandingPageFocusAreaItem';

export type LandingPageFocusAreaGroupProps = {
  label: string;
  items: Entry<LandingPageFocusAreaItemProps>[];
};

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
