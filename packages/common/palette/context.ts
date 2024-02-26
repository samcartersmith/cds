import { Context, createContext } from 'react';

import { PaletteConfig } from '../types';

export const PaletteConfigContext: Context<PaletteConfig | undefined> = createContext<
  PaletteConfig | undefined
>(undefined);
