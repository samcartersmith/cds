import React from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Box, Fallback, HStack } from '@cbhq/cds-web/layout';
import { VStack } from '@cbhq/cds-web/layout/VStack';

const LandingAreaFocusAreaItemFallback = () => {
  return <Fallback width={200} height={28.39} />;
};

const LandingAreaFocusAreaGroupFallback = () => {
  return (
    <HStack>
      <Box width="25%">
        <Fallback width={107} height={24} />
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
      <Box spacing={gutter} width="50%" borderedEnd>
        <Fallback width={320} height={126} />
      </Box>
      <VStack spacing={gutter} gap={gutter} width="50%">
        <LandingAreaFocusAreaGroupFallback />
        <LandingAreaFocusAreaGroupFallback />
        <LandingAreaFocusAreaGroupFallback />
      </VStack>
    </HStack>
  );
};

export default LandingPageFocusAreasFallback;
