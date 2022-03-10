export function getPercentageText(partial: number, total?: number) {
  let decimalPercent = partial;
  if (total) {
    decimalPercent = Number(partial / total);
  }
  if (decimalPercent === 0) {
    return `0%`;
  }
  if (decimalPercent === 1) {
    return '100%';
  }
  return `${(decimalPercent * 100).toFixed(2)}%`;
}
