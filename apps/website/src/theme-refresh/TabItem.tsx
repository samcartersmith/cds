import React from 'react';
import type { Props } from '@theme/TabItem';
import { VStack } from '@cbhq/cds-web/layout';

import { RightSidebar, TOCItem } from '../theme/RightSidebar';

export type TabItemProps = Props & {
  toc?: TOCItem[];
};

export default function TabItem({ children, hidden, toc }: TabItemProps): JSX.Element {
  return (
    <>
      {toc ? <RightSidebar toc={toc} /> : null}
      <VStack gap={3} role="tabpanel" {...{ hidden }}>
        {children}
      </VStack>
    </>
  );
}
