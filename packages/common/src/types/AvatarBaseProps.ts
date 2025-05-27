import { ThemeVars } from '../core/theme';

import { Shape } from './Shape';

export type AvatarShape = Extract<Shape, 'circle' | 'square' | 'hexagon'>;
export type AvatarFallback = 'image' | 'text';
export type AvatarFallbackColor = Extract<
  ThemeVars.SpectrumHue,
  'blue' | 'purple' | 'green' | 'teal' | 'pink' | 'gray'
>;
