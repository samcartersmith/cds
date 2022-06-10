import React, { memo } from 'react';
import { TOCItems } from '@theme/createTOCManager';
import type { Props } from '@theme/TabItem';
import { TOCUpdater } from '@theme/TOCManager';
import type { SpacingScale } from '@cbhq/cds-web';
import { VStack } from '@cbhq/cds-web/layout';

export type TabItemProps = Props & {
  toc?: TOCItems;
  gap?: SpacingScale;
};

const TabItem = memo(function TabItem({ children, hidden, gap, toc }: TabItemProps): JSX.Element {
  return (
    <>
      {toc ? <TOCUpdater toc={toc} /> : null}
      <VStack gap={gap} role="tabpanel" {...{ hidden }}>
        {children}
      </VStack>
    </>
  );
});

export default TabItem;
