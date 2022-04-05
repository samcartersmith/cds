export const emptyArray = [];

export const arrayToObject = <T extends string | number>(arr: T[] | Readonly<T[]>) =>
  [...arr].reduce((prev, next) => {
    return {
      ...prev,
      [`${next}`]: next,
    };
  }, {} as { [key in T]: key });

export const arrayIncludes = <T>(arr: T[], arg: T) => arr.includes(arg);
