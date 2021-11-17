export function addToLabelNumRefArray(numArray: number[], num: number | null) {
  if (Number.isFinite(num)) {
    if (numArray.length === 0 || numArray[numArray.length - 1] !== num) {
      numArray.push(num as number);
    }
  }
}

export function getLastLabelNum(numArray: number[], num: number) {
  return numArray.length > 1 ? numArray[numArray.length - 2] : num;
}
