import * as React from 'react';

import { InternalPaletteConfig } from '../types';
import { defaultPalette } from './constants';

export const PaletteConfigContext = React.createContext<InternalPaletteConfig>(defaultPalette);
