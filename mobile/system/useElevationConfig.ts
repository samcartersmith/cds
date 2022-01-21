import { createContext, useContext, useMemo } from 'react';
import { ElevationLevels } from '@cbhq/cds-common/types';
import { ElevationStylesContext, ElevationConfigs } from './ElevationStylesContext';

const DummyContext = createContext<ElevationConfigs | undefined>(undefined);

/**
 * useElevationConfig is used in many primitives components.
 * To minimize our footprint we want to bail out of anything unecessarily.
 */
export function useElevationConfig(level?: ElevationLevels) {
  // Don't subscribe to elevation context if we don't need to access elevation
  const configs = useContext(level ? ElevationStylesContext : DummyContext);
  return useMemo(() => {
    if (configs === undefined || level === 0) return undefined;
    if (level === 1) return configs.elevation1;
    if (level === 2) return configs.elevation2;
    return undefined;
  }, [configs, level]);
}
