import React, { createContext, useContext } from 'react';
import { ResponsivePropsDevices } from '@cbhq/cds-common2/types/Responsive';

const DefaultBreakpointContext = createContext<ResponsivePropsDevices | undefined>(undefined);

export type BreakpointsProviderProps = {
  children: React.ReactNode;
  device: ResponsivePropsDevices;
};
/**
 * This Provider should be used in SSR/SSG environments
 * when you want a specific device's styles to render at on first paint.
 */
export const BreakpointsProvider = ({ children, device }: BreakpointsProviderProps) => (
  <DefaultBreakpointContext.Provider value={device}>{children}</DefaultBreakpointContext.Provider>
);
export const useDefaultBreakpointContext = () => useContext(DefaultBreakpointContext);
