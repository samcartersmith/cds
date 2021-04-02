import { useMemo } from 'react';

import { join } from '@cbhq/cds-common';
import { LinkButton } from '@cbhq/cds-web/buttons/LinkButton';
import { HStack, VStack, Spacer } from '@cbhq/cds-web/layout';

const variants = ['primary', 'secondary', 'negative'] as const;

export const LinkButtonSheet = () => {
  const buttons = useMemo(() => {
    return join(
      variants.map(item => (
        <LinkButton block key={item} variant={item}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </LinkButton>
      )),
      <Spacer horizontal={3} />
    );
  }, []);

  return (
    <VStack alignSelf="center">
      <HStack>{buttons}</HStack>
    </VStack>
  );
};
