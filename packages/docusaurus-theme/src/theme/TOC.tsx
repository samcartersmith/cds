import React, { memo } from 'react';
import { usePropsTOC } from '@theme/PropsTOCManager';
import type { Props } from '@theme/TOC';
import { useTOC } from '@theme/TOCManager';
import OriginalTOC from '@theme-init/TOC';

const TOC = memo(function TOC(props: Props) {
  const { items: itemsForProps = [] } = usePropsTOC();
  const { items = [] } = useTOC();
  const propsOverride = items ? { ...props, toc: [...items, ...itemsForProps] } : props;
  return <OriginalTOC {...propsOverride} />;
});

export default TOC;
