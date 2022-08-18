import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Fallback } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const LandingPageAnnouncementsFallback = () => {
  return (
    <VStack
      gap={1}
      alignItems="flex-start"
      spacingVertical={6}
      spacingHorizontal={gutter}
      width="100%"
    >
      <Fallback width={250} height={36} />
      <Fallback width={350} height={20} />
      <Fallback width={150} height={40} />
    </VStack>
  );
};

export default LandingPageAnnouncementsFallback;
