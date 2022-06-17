import React, { createContext, ReactNode, useContext } from 'react';
import { ResponsivePropsDevices } from '@cbhq/cds-common';

const DefaultToDeviceContext = createContext<ResponsivePropsDevices | undefined>(undefined);

export type DefaultToDeviceProps = {
  children: ReactNode;
  device: ResponsivePropsDevices;
};
/**
 * This Provider should be used in SSR/SSG environments
 * when you want phone styles to render at on first paint.
 */
export const DefaultToDeviceProvider = ({ children, device }: DefaultToDeviceProps) => (
  <DefaultToDeviceContext.Provider value={device}>{children}</DefaultToDeviceContext.Provider>
);
export const useDefaultToDeviceContext = () => useContext(DefaultToDeviceContext);
