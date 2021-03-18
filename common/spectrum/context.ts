import { createContext } from 'react';

import { Spectrum } from '../types';

export const DEFAULT_SPECTRUM = 'light';

export const SpectrumContext = createContext<Spectrum>(DEFAULT_SPECTRUM);
