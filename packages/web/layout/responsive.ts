/** @deprecated Please use breakpoints/deviceBreakpoints */
export const breakpoints = {
  giant: 1170,
  tablet: 768,
  phone: 560,
};

/** @deprecated Please use breakpoints/deviceMqs */
export const devices = {
  phone: `max-width: ${breakpoints.phone}px`,
  tablet: `max-width: ${breakpoints.tablet}px`,
  desktop: `min-width: ${breakpoints.tablet + 1}px`,
  giant: `min-width: ${breakpoints.giant}px`,
};
