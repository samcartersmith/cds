import { createContext } from 'react';
import { noop } from '@cbhq/cds-utils';

import { RootScalePreference, Scale, SetState } from '../types';

export const DEFAULT_SCALE = 'large';

export const ScaleContext = createContext<Scale>(DEFAULT_SCALE);
export const RootScaleContext = createContext<Scale | undefined>(undefined);
export const RootScalePreferenceContext = createContext<RootScalePreference | undefined>(undefined);
export const RootScalePreferenceUpdaterContext = createContext<SetState<RootScalePreference>>(noop);
