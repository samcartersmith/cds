import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextBody } from '@cbhq/cds-web/typography';

import { AppSwitcherExample } from './Example';

export const Intro = () => {
  return (
    <VStack spacingVertical={2} gap={2}>
      <TextBody as="p">
        App Switcher is a global component that lives in the Navigation Header that enables users to
        switch between all Coinbase products without having to log in again.
      </TextBody>
      <AppSwitcherExample />
    </VStack>
  );
};
