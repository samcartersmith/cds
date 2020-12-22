import * as React from 'react';

import { defaultPalette } from './defaultPalette';
import { PaletteConfig } from './types';

export const PaletteConfigContext = React.createContext<PaletteConfig>(defaultPalette);
