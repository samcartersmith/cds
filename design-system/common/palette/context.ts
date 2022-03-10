import { createContext } from 'react';

import { PaletteConfig } from '../types';
import { defaultPalette } from './constants';

export const PaletteConfigContext = createContext<PaletteConfig>(defaultPalette);
