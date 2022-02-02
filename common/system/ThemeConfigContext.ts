import { createContext } from 'react';

import type { ThemeConfig, ThemeConfigForSpectrum } from '../types';

export type ThemeConfigContextValue = { config: ThemeConfig; activeConfig: ThemeConfigForSpectrum };

export const ThemeConfigContext = createContext<ThemeConfigContextValue | undefined>(undefined);
