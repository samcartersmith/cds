import { createContext } from 'react';

import { PaletteConfig, PartialPaletteConfig } from '../types';

export const PaletteConfigContext: React.Context<PaletteConfig | undefined> = createContext<
  PaletteConfig | undefined
>(undefined);

export const PaletteOverridesContext: React.Context<PartialPaletteConfig> =
  createContext<PartialPaletteConfig>({});
