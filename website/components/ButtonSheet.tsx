import { useMemo } from 'react';

import { join } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { VStack, HStack, Spacer } from '@cbhq/cds-web/layout';

const variants = ['primary', 'secondary', 'positive', 'negative'] as const;

export const ButtonSheet = () => {
  const buttons = useMemo(() => {
    return join(
      variants.map((item) => (
        <Button block key={item} variant={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      )),
      <Spacer horizontal={3} />,
    );
  }, []);

  return (
    <VStack alignSelf="center">
      <HStack>{buttons}</HStack>
    </VStack>
  );
};
