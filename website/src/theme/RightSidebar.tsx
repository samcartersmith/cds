import { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';

import { SetState } from '@cbhq/cds-common/types';
import { noop } from '@cbhq/cds-utils';

// Copied from docusaurus types
export type TOCItem = {
  readonly value: string;
  readonly id: string;
  readonly children: TOCItem[];
  readonly level: number;
};

type RightSidebarItems = TOCItem[] | undefined;
type RightSidebarContextValue = {
  items: RightSidebarItems;
  update: SetState<RightSidebarItems>;
};

const fallback = {
  items: undefined,
  update: noop,
};

const RightSidebarContext = createContext<RightSidebarContextValue>(fallback);
export const useRightSidebar = () => useContext(RightSidebarContext);

/** Needed to override the table of contents in the right sidebar when rendering multiple mdx files on single page. */
export const RightSidebarProvider: React.FC = memo(({ children }) => {
  const [items, update] = useState<RightSidebarItems>();
  const value = useMemo(() => ({ items, update }), [items]);
  return <RightSidebarContext.Provider value={value}>{children}</RightSidebarContext.Provider>;
});

/** Use this when dynamically rendering MDX files. `toc` is available as const in all mdx files and can be passed as prop into this component.  */
export const RightSidebar = ({ toc }: { toc: RightSidebarItems }) => {
  const { update } = useRightSidebar();
  useEffect(() => {
    if (toc) {
      update(toc);
    }

    return () => {
      update(undefined);
    };
  }, [toc, update]);
  return null;
};

RightSidebarProvider.displayName = 'RightSidebarProvider';
