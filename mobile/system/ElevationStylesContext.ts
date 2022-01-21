import { createContext } from 'react';
import { ElevationConfig } from './elevationBuilder';

export type { ElevationConfig };
export type ElevationConfigs = Record<'elevation1' | 'elevation2', ElevationConfig>;
export const ElevationStylesContext = createContext<ElevationConfigs | undefined>(undefined);
