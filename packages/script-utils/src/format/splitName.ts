import { Split } from 'type-fest';

export function splitName<T extends string, Separator extends string>(
  name: T,
  separator: Separator,
) {
  return name.trim().split(separator) as Split<T, Separator>;
}
