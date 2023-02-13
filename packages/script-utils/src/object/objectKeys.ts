export const objectKeys = <Obj>(obj: { [key in keyof Obj]: Obj[key] }) =>
  Object.keys(obj) as Extract<keyof Obj, string>[];
