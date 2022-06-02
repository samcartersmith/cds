import React from 'react';
import { TOCItems } from '@theme/createTOCManager';
import type { Props } from '@theme/TabItem';
import { TOCUpdater } from '@theme/TOCManager';
import { VStack } from '@cbhq/cds-web/layout';

export type TabItemProps = Props & {
  toc?: TOCItems;
};

export default function TabItem({ children, hidden, toc }: TabItemProps): JSX.Element {
  return (
    <>
      {toc ? <TOCUpdater toc={toc} /> : null}
      <VStack gap={3} role="tabpanel" {...{ hidden }}>
        {children}
      </VStack>
    </>
  );
}
