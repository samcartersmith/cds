/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

export type Spectrum = 'dark' | 'light';

export type SpectrumHue =
  | 'blue'
  | 'green'
  | 'orange'
  | 'yellow'
  | 'gray'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'red';

export type SpectrumHueStep =
  | '0'
  | '5'
  | '10'
  | '15'
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | '100';

export type SpectrumAlias = `${SpectrumHue}${SpectrumHueStep}`;

export type SpectrumAliasWithOpacity = [SpectrumAlias, number];
