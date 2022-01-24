import { useCallback, useMemo, useState } from 'react';

export type OnContentSizeChange = (width: number, height: number) => void;
export type ContentSize = {
  width: number;
  height: number;
};

export const useContentSize = (): [ContentSize, OnContentSizeChange] => {
  const [size, setSize] = useState<ContentSize>({
    width: 0,
    height: 0,
  });

  const onContentSizeChange = useCallback<OnContentSizeChange>((width, height) => {
    setSize({ width, height });
  }, []);

  return useMemo(() => [size, onContentSizeChange], [onContentSizeChange, size]);
};
