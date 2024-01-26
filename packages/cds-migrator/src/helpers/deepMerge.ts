import { objectKeys } from './types';

const isObject = <Obj>(item: Obj): boolean =>
  !!item && typeof item === 'object' && !Array.isArray(item);

export function deepMerge<Obj>(...objects: Obj[]): Obj {
  const result: Obj = {} as Obj;

  objects.forEach((obj) => {
    if (isObject(obj)) {
      // @ts-expect-error Fix this
      objectKeys(obj).forEach((key) => {
        if (isObject(obj[key])) {
          if (!result[key]) {
            // @ts-expect-error Fix this
            result[key] = {};
          }
          // @ts-expect-error Fix this
          result[key] = deepMerge(result[key] as Obj, obj[key] as Obj);
        } else {
          result[key] = obj[key];
        }
      });
    }
  });

  return result;
}
