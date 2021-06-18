import { createContext } from 'react';

import { noop } from '@cbhq/cds-utils';

import { SetState, Spectrum } from '../types';

export const DEFAULT_SPECTRUM = 'light';

export const SpectrumContext = createContext<Spectrum>(DEFAULT_SPECTRUM);
export const RootSpectrumContext = createContext<Spectrum | undefined>(undefined);
export const RootSpectrumUpdaterContext = createContext<SetState<Spectrum>>(noop);
