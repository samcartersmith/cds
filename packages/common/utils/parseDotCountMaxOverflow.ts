// If a badge count is greater than 99, it should
// truncate the numbers so its x+.
export const MAX_OVERFLOW_COUNT = 99;

export const parseDotCountMaxOverflow = (count: number) => {
  return count <= MAX_OVERFLOW_COUNT ? count : `${MAX_OVERFLOW_COUNT}+`;
};
