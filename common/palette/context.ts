import * as React from 'react';

import { PaletteConfig } from '../types';
import { defaultPalette } from './constants';

export const PaletteConfigContext = React.createContext<PaletteConfig>(defaultPalette);
