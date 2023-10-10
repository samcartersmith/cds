import React, { memo } from 'react';
import { useChangelogTOC } from '@theme/ChangelogTOCManager';
import { usePropsTOC } from '@theme/PropsTOCManager';
import type { Props } from '@theme/TOC';
import { useTOC } from '@theme/TOCManager';
import OriginalTOC from '@theme-init/TOC';

const TOC = memo(function TOC(props: Props) {
  const { items: itemsForChangelog = [] } = useChangelogTOC();
  const { items: itemsForProps = [] } = usePropsTOC();
  const { items = [] } = useTOC();
  const propsOverride = items
    ? { ...props, toc: [...items, ...itemsForProps, ...itemsForChangelog] }
    : props;
  return <OriginalTOC {...propsOverride} />;
});

export default TOC;
