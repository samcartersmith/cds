import React from 'react';
import { TOCItem } from '@docusaurus/mdx-loader';
import { usePlatformContext } from '@site/src/utils/PlatformContext';
import { VStack } from '@cbhq/cds-web/layout';

import { TOCUpdater } from '../../../utils/toc/TOCManager';

type ContentMetaContainerProps = {
  webContent?: React.ReactNode;
  mobileContent?: React.ReactNode;
  webContentToc?: TOCItem[];
  mobileContentToc?: TOCItem[];
};

export const ContentPageContainer: React.FC<ContentMetaContainerProps> = ({
  webContent,
  mobileContent,
  webContentToc,
  mobileContentToc,
}) => {
  const { platform } = usePlatformContext();
  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  return (
    <VStack as="section">
      <VStack
        background="bgAlternate"
        borderRadius={500}
        display="block"
        gap={3}
        paddingBottom={2}
        paddingEnd={4}
        paddingStart={4}
        paddingTop={5}
      >
        <TOCUpdater toc={isWeb ? webContentToc : mobileContentToc} />
        {isWeb && webContent}
        {isMobile && mobileContent}
      </VStack>
    </VStack>
  );
};
