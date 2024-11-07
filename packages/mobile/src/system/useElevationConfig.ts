import { createContext, useContext, useMemo } from 'react';
import { ElevationLevels } from '@cbhq/cds-common/types';

import { ElevationConfigs, ElevationConfigsContext } from './ElevationConfigsContext';

const DummyElevationConfigsContext = createContext<ElevationConfigs | undefined>(undefined);

/**
 * useElevationConfig can be used to apply elevation styles within a CDS components.
 * The object returned from elevationConfig.themeConfig has the same shape as useThemeConfig()
 * so that you can conditionally use the color overrides required for elevation or the
 * colors provided in palette if no elevation is used (see example below).
 * @example 
 * ```
    const themeConfig = useThemeConfig();
    const elevationConfig = useElevationConfig(elevation);
    const { activeConfig } = elevationConfig?.themeConfig ?? themeConfig;
    const { background, primary } = activeConfig.rgbaStrings;
    // If elevation is present, elevationConfig.styles, will include box shadow styles,etc.
    return <View style={[elevationConfig?.styles, {backgroundColor: background}]} /> 
 * ```
 */
export const useElevationConfig = (level?: ElevationLevels) => {
  // Don't subscribe to elevation context if we don't need to access elevation
  const elevationContext = useContext(
    level ? ElevationConfigsContext : DummyElevationConfigsContext,
  );
  return useMemo(() => {
    if (level === 0) return undefined;
    if (level === 1) return elevationContext?.elevation1;
    if (level === 2) return elevationContext?.elevation2;
    return undefined;
  }, [level, elevationContext]);
};
