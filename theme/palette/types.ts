/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ReadonlyDeep } from 'type-fest';

import { SpectrumAlias, SpectrumAliasWithOpacity } from '../spectrum/types';
import { defaultPalette } from './defaultPalette';

export type PaletteAlias = keyof typeof defaultPalette;

export type PaletteForeground = Extract<
  PaletteAlias,
  | 'foreground'
  | 'foregroundMuted'
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'positive'
  | 'positiveForeground'
  | 'negative'
  | 'negativeForeground'
>;

export type PaletteBackground = Extract<
  PaletteAlias,
  | 'background'
  | 'backgroundAlternate'
  | 'backgroundOverlay'
  | 'divider'
  | 'stroke'
  | 'primary'
  | 'secondary'
  | 'positive'
  | 'negative'
>;

export type PaletteConfig = ReadonlyDeep<
  Record<PaletteAlias, SpectrumAlias | SpectrumAliasWithOpacity>
>;
