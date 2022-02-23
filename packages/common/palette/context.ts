import { Context, createContext } from 'react';

import { PaletteConfig } from '../types';

import { defaultPalette } from './constants';

export const PaletteConfigContext: Context<PaletteConfig> =
  createContext<PaletteConfig>(defaultPalette);
