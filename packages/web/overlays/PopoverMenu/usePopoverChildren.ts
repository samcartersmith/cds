import { ReactElement, ReactNode, useMemo, useRef } from 'react';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';

import { PopoverTrigger } from './PopoverTrigger';
import { PopoverTriggerWrapper } from './PopoverTriggerWrapper';

/**
 * @deprecated
 * Parses out the trigger from the rest of the children
 */
export const usePopoverChildren = (children: ReactNode) => {
  const trigger = useRef<ReactElement | null>(null);

  const childNodes = useMemo(
    () =>
      flattenNodes(children).map((child) => {
        if (child && typeof child === 'object') {
          if (child.type === PopoverTrigger || child.type === PopoverTriggerWrapper) {
            trigger.current = child;
            return null;
          }
        }
        return child;
      }),
    [children],
  );

  return {
    triggerNode: trigger.current,
    childNodes,
  };
};
