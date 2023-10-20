import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Fallback } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const LandingPageAnnouncementsFallback = () => {
  return (
    <VStack
      alignItems="flex-start"
      gap={1}
      spacingHorizontal={gutter}
      spacingVertical={6}
      width="100%"
    >
      <Fallback height={36} width={250} />
      <Fallback height={20} width={350} />
      <Fallback height={40} width={150} />
    </VStack>
  );
};

export default LandingPageAnnouncementsFallback;
