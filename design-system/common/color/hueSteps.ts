/**
 * keys are the available hue steps.
 * value is the index of the hue step.
 */
export const hueStepMap: Record<number, number> = {
  0: 0,
  5: 1,
  10: 2,
  15: 3,
  20: 4,
  30: 5,
  40: 6,
  50: 7,
  60: 8,
  70: 9,
  80: 10,
  90: 11,
  100: 12,
};

export const hueSteps = Object.keys(hueStepMap);
