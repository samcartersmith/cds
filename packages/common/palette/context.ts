import { Context, createContext } from 'react';

import { PaletteConfig, PartialPaletteConfig } from '../types';

export const PaletteConfigContext: Context<PaletteConfig | undefined> = createContext<
  PaletteConfig | undefined
>(undefined);

export const PaletteOverridesContext: Context<PartialPaletteConfig> =
  createContext<PartialPaletteConfig>({});
