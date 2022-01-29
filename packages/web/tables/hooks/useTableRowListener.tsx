import { useCallback, useEffect } from 'react';
import { NoopFn } from '@cbhq/cds-common';

import { TableRowRef } from '../types/tableRowTypes';

/** Call an event handler on Enter and Space keypress */
export const useTableRowListener = (ref: TableRowRef, handler: NoopFn) => {
  const handleEvent = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (key === 'Enter' || code === 'Space') {
        handler();
      }
    },
    [handler],
  );

  useEffect(() => {
    // Create a reference to the reference for unmounting
    const target = ref.current;
    target?.addEventListener('keydown', handleEvent);

    // Remove event listeners on cleanup
    return () => {
      target?.removeEventListener('keydown', handleEvent);
    };
  }, [ref, handleEvent]);
};
