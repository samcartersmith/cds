import { createContext } from 'react';

import { PaletteConfig } from '../types';

import { defaultPalette } from './constants';

export const PaletteConfigContext: React.Context<PaletteConfig> =
  createContext<PaletteConfig>(defaultPalette);
