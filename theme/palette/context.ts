import * as React from 'react';

import { defaultPalette } from './constants';
import { InternalPaletteConfig } from './types';

export const PaletteConfigContext = React.createContext<InternalPaletteConfig>(defaultPalette);
