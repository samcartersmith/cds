import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Box, Fallback, HStack } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const LandingAreaFocusAreaItemFallback = () => {
  return <Fallback height={28.39} width={200} />;
};

const LandingAreaFocusAreaGroupFallback = () => {
  return (
    <HStack>
      <Box width="25%">
        <Fallback height={24} width={107} />
      </Box>
      <VStack>
        <LandingAreaFocusAreaItemFallback />
        <LandingAreaFocusAreaItemFallback />
        <LandingAreaFocusAreaItemFallback />
      </VStack>
    </HStack>
  );
};

const LandingPageFocusAreasFallback = () => {
  return (
    <HStack minHeight={600}>
      <Box borderedEnd spacing={gutter} width="50%">
        <Fallback height={126} width={320} />
      </Box>
      <VStack gap={gutter} spacing={gutter} width="50%">
        <LandingAreaFocusAreaGroupFallback />
        <LandingAreaFocusAreaGroupFallback />
        <LandingAreaFocusAreaGroupFallback />
      </VStack>
    </HStack>
  );
};

export default LandingPageFocusAreasFallback;
