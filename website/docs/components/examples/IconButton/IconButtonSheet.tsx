import React from 'react';

import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { VStack, Box } from '@cbhq/cds-web/layout';

const variants = ['primary', 'secondary'] as const;

export const IconButtonSheet = () => {
  return (
    <VStack alignSelf="center">
      {variants.map((variant, index) => (
        <Box flexDirection="row" key={index} width={140}>
          <IconButton variant={variant} accessibilityLabel="heartHeavy" name="heartHeavy" />
          <p style={{ paddingTop: 5, paddingLeft: 10 }}>{variant}</p>
        </Box>
      ))}
    </VStack>
  );
};
