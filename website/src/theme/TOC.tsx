import React from 'react';
import OriginalTOC from '@theme-original/TOC';

import { useRightSidebar, TOCItem } from './RightSidebar';

const TOC = (props: { toc: TOCItem[] }) => {
  const { items } = useRightSidebar();
  const propsOverride = items ? { ...props, toc: items } : props;
  return <OriginalTOC {...propsOverride} />;
};

export default TOC;
