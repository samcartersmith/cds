import { createContext } from 'react';

import type { ThemeConfig } from '../types';

export const ThemeConfigContext = createContext<ThemeConfig | undefined>(undefined);
