import * as React from 'react';

import { Scale } from './types';

export const DEFAULT_SCALE = 'large' as const;

export const ScaleContext = React.createContext<Scale>(DEFAULT_SCALE);
