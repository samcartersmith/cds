import * as React from 'react';

import { Spectrum } from './types';

export const DEFAULT_SPECTRUM = 'light';

export const SpectrumContext = React.createContext<Spectrum>(DEFAULT_SPECTRUM);
