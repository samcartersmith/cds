import { MutableRefObject, useCallback, useState } from 'react';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { getBrowserGlobals, isSSR } from '../utils/browser';

import { useIsoEffect } from './useIsoEffect';

const defaultValue: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: NoopFn,
};

export const useBoundingClientRect = (ref: MutableRefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState<DOMRect>(
    ref.current ? ref.current.getBoundingClientRect() : defaultValue,
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setRect(ref.current?.getBoundingClientRect());
    }
  }, [ref]);

  useIsoEffect(() => {
    if (ref.current) {
      handleResize();
    }
    if (isSSR()) {
      return undefined;
    }
    getBrowserGlobals()?.window.addEventListener('resize', handleResize);
    return () => getBrowserGlobals()?.window.removeEventListener('resize', handleResize);
  }, [ref, handleResize]);

  return rect;
};
