import { createContext } from 'react';

import { noop } from '@cbhq/cds-utils';

import { Scale, SetState } from '../types';

export const DEFAULT_SCALE = 'large' as const;

export const ScaleContext = createContext<Scale>(DEFAULT_SCALE);
export const RootScaleContext = createContext<Scale | undefined>(undefined);
export const RootScaleUpdaterContext = createContext<SetState<Scale>>(noop);
