import { createContext } from 'react';
import { ElevationConfigForSpectrum } from './createElevationConfigForSpectrum';

export type { ElevationConfigForSpectrum };
export type ElevationConfigs = Record<'elevation1' | 'elevation2', ElevationConfigForSpectrum>;
export const ElevationConfigsContext = createContext<ElevationConfigs | undefined>(undefined);
