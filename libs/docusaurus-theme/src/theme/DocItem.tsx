import React from 'react';
import type { Props } from '@theme/DocItem';
import OriginalDocItem from '@theme-init/DocItem';
import { VStack } from '@cbhq/cds-web/layout';

import { TOKENS } from './tokens';

type DocItemProps = Omit<Props, 'content'> & {
  content: { toc: { id: string; value: string; children: unknown[] }[] };
};

// This file forces our right sidebar to render by tricking
// Docusaurus into thinking we have a TOC.
export default function DocItem({ content, ...props }: DocItemProps) {
  content.toc.push({
    id: '',
    value: '',
    children: [],
  });

  return (
    <VStack spacingHorizontal={TOKENS.docItem.spacingHorizontal} spacingBottom={10}>
      <OriginalDocItem {...props} content={content} />
    </VStack>
  );
}
