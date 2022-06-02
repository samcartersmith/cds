/** @deprecated Please use deviceBreakpoints */
export const breakpoints = {
  giant: 1170,
  tablet: 768,
  phone: 560,
};

/** @deprecated Please use deviceMqs */
export const devices = {
  phone: `max-width: ${breakpoints.phone}px`,
  tablet: `max-width: ${breakpoints.tablet}px`,
  desktop: `min-width: ${breakpoints.tablet + 1}px`,
  giant: `min-width: ${breakpoints.giant}px`,
};

export const devicesKeys = [
  'phone',
  'phoneLarge',
  'tablet',
  'tabletLandscape',
  'desktop',
  'desktopLarge',
  'extraWide',
] as const;

export type DeviceBreakpoint = typeof devicesKeys[number];

export const deviceBreakpoints: Record<DeviceBreakpoint, number> = {
  phone: 360,
  phoneLarge: 560,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1280,
  desktopLarge: 1440,
  extraWide: 1600,
};

export const deviceMqs: Record<DeviceBreakpoint, string> = {
  phone: `max-width: ${deviceBreakpoints.phoneLarge - 1}px`,
  phoneLarge: `max-width: ${deviceBreakpoints.tablet - 1}px`,
  tablet: `max-width: ${deviceBreakpoints.tabletLandscape - 1}px`,
  tabletLandscape: `max-width: ${deviceBreakpoints.desktop - 1}px`,
  desktop: `min-width: ${deviceBreakpoints.desktop}px`,
  desktopLarge: `min-width: ${deviceBreakpoints.desktopLarge}px`,
  extraWide: `min-width: ${deviceBreakpoints.extraWide}px`,
};

export const deviceMqRanges: Record<DeviceBreakpoint, string> = {
  phone: `(max-width: ${deviceBreakpoints.phoneLarge - 1}px)`,
  phoneLarge: `(min-width: ${deviceBreakpoints.phoneLarge}px) and (max-width: ${
    deviceBreakpoints.tablet - 1
  }px)`,
  tablet: `(min-width: ${deviceBreakpoints.tablet}px) and (max-width: ${
    deviceBreakpoints.desktop - 1
  }px)`,
  tabletLandscape: `(min-width: ${deviceBreakpoints.tabletLandscape}px) and (max-width: ${
    deviceBreakpoints.desktop - 1
  }px)`,
  desktop: `(min-width: ${deviceBreakpoints.desktop}px)`,
  desktopLarge: `(min-width: ${deviceBreakpoints.desktopLarge}px)`,
  extraWide: `(min-width: ${deviceBreakpoints.extraWide}px)`,
};
