import { useMemo } from 'react';

export function useBackground(name: string): string {
  return useMemo(() => {
    /* eslint-disable no-bitwise */
    const hash = [...name].reduce((h, char, index) => {
      return name.charCodeAt(index) + ((h << 5) - h);
    }, 0);

    const color: string = new Array<number>(3).fill(0).reduce((c, empty, index) => {
      const value = (hash >> (index * 8)) & 0xff;

      let colorPart: string = c;
      colorPart += `00${value.toString(16)}`.substr(-2);
      return colorPart;
    }, '#');
    /* eslint-enable no-bitwise */
    return color;
  }, [name]);
}
