import * as d3Color from 'd3-color';

const { color } = d3Color;

export const darkenColor = (value: string) => {
  const d3Color = color(value);
  return d3Color?.darker().formatHex();
};
