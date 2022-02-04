import React from 'react';
import OriginalTOC, { TOCHeadings } from '@theme-original/TOC';

import { TOCItem, useRightSidebar } from './RightSidebar';

const TOC = (props: { toc: TOCItem[] }) => {
  const { items } = useRightSidebar();
  const propsOverride = items ? { ...props, toc: items } : props;
  return <OriginalTOC {...propsOverride} />;
};

export { TOCHeadings };

export default TOC;
