import React, { useMemo } from 'react';

import { join } from '@cbhq/cds-common';
import { Button, VStack, HStack, Spacer } from '@cbhq/cds-web';

const variants = ['primary', 'secondary', 'positive', 'negative'] as const;

export const ButtonSheet = () => {
  const buttons = useMemo(() => {
    return join(
      variants.map(item => (
        <Button block key={item} variant={item}>
          {item}
        </Button>
      )),
      <Spacer spacingEnd={3} />
    );
  }, []);

  return (
    <VStack alignSelf="center">
      <HStack>{buttons}</HStack>
    </VStack>
  );
};
