import { VStack } from '@cbhq/cds-web/layout/VStack';

import { AppSwitcherExample } from './Example';

export const Intro = () => {
  return (
    <VStack spacingVertical={2} gap={2}>
      <AppSwitcherExample />
    </VStack>
  );
};
