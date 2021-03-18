import { createContext } from 'react';

import { Scale } from '../types';

export const DEFAULT_SCALE = 'large' as const;

export const ScaleContext = createContext<Scale>(DEFAULT_SCALE);
