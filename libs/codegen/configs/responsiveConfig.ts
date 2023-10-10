import { marginStylesForDevice, paddingStylesForDevice } from '../Spacing';

import { responsiveClassName } from './constants';
import { displayStylesForDevice } from './displayConfig';
import { flexStylesForDevice } from './flexConfig';
import { gapStylesForDevice } from './gapConfig';
import { columnStylesForDevice, gridStylesForDevice } from './gridConfig';
import { visibilityStylesForDevice } from './visibilityConfig';

// Please don't change the order! smaller queries need to be lower in the stylesheet to maintain specificity
const deviceKeys = [
  'extraWide',
  'desktopLarge',
  'desktop',
  'tabletLandscape',
  'tablet',
  'phoneLandscape',
  'phone',
] as const;

export type DeviceBreakpoint = (typeof deviceKeys)[number];
type DeviceBreakpoints = Record<DeviceBreakpoint, number>;

const internalResponsivePropsDevices = ['desktop', 'tabletLandscape', 'phoneLandscape'] as const;
type InternalResponsivePropsDevices = (typeof internalResponsivePropsDevices)[number];

const responsivePropsDevices = ['desktop', 'tablet', 'phone'] as const;
type ResponsivePropsDevices = (typeof responsivePropsDevices)[number];

const deviceBreakpoints: DeviceBreakpoints = {
  phone: 360,
  phoneLandscape: 560,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1280,
  desktopLarge: 1440,
  extraWide: 1600,
};

const deviceMqs: Record<DeviceBreakpoint, string> = {
  phone: `max-width: ${deviceBreakpoints.phoneLandscape - 1}px`,
  phoneLandscape: `max-width: ${deviceBreakpoints.tablet - 1}px`,
  tablet: `max-width: ${deviceBreakpoints.tabletLandscape - 1}px`,
  tabletLandscape: `max-width: ${deviceBreakpoints.desktop - 1}px`,
  desktop: `min-width: ${deviceBreakpoints.desktop}px`,
  desktopLarge: `min-width: ${deviceBreakpoints.desktopLarge}px`,
  extraWide: `min-width: ${deviceBreakpoints.extraWide}px`,
};

const deviceMqRanges: Record<DeviceBreakpoint, string> = {
  phone: `(max-width: ${deviceBreakpoints.phoneLandscape - 1}px)`,
  phoneLandscape: `(min-width: ${deviceBreakpoints.phoneLandscape}px) and (max-width: ${
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

const responsivePropsDeviceNameMap: Record<InternalResponsivePropsDevices, ResponsivePropsDevices> =
  {
    desktop: 'desktop',
    tabletLandscape: 'tablet',
    phoneLandscape: 'phone',
  };

type SpacingClassNamesType = Record<string, Record<string, Record<string | number, string>>>;
type ClassNamesType = Record<string, Record<string | number, string>>;

type ResponsivePropsClassNames = Record<
  ResponsivePropsDevices,
  ClassNamesType | SpacingClassNamesType
>;

const spacingDeviceClassNames = internalResponsivePropsDevices.reduce(
  (acc: ResponsivePropsClassNames, device: InternalResponsivePropsDevices) => {
    const styles = Object.assign(
      paddingStylesForDevice(deviceMqs[device]),
      marginStylesForDevice(deviceMqs[device]),
    );
    const deviceName = responsivePropsDeviceNameMap[device];
    acc[deviceName] = styles;
    return acc;
  },
  {} as ResponsivePropsClassNames,
);

const deviceClassNames = internalResponsivePropsDevices.reduce(
  (acc: ResponsivePropsClassNames, device: InternalResponsivePropsDevices) => {
    const styles = Object.assign(
      gapStylesForDevice(deviceMqs[device]),
      flexStylesForDevice(deviceMqs[device], 'alignItems'),
      flexStylesForDevice(deviceMqs[device], 'alignContent'),
      flexStylesForDevice(deviceMqs[device], 'alignSelf'),
      flexStylesForDevice(deviceMqs[device], 'justifyContent'),
      flexStylesForDevice(deviceMqs[device], 'flexDirection'),
      flexStylesForDevice(deviceMqs[device], 'flexWrap'),
      flexStylesForDevice(deviceMqs[device], 'flexShrink'),
      flexStylesForDevice(deviceMqs[device], 'flexGrow'),
      displayStylesForDevice(deviceMqs[device]),
      visibilityStylesForDevice(deviceMqs[device]),
      gridStylesForDevice(deviceMqs[device]),
      columnStylesForDevice(deviceMqs[device], 'Start'),
      columnStylesForDevice(deviceMqs[device], 'End'),
    ) as ClassNamesType;
    const deviceName = responsivePropsDeviceNameMap[device];
    acc[deviceName] = styles;
    return acc;
  },
  {} as ResponsivePropsClassNames,
);

export const responsiveConfig = {
  spacingStyles: spacingDeviceClassNames,
  styles: deviceClassNames,
  deviceBreakpoints,
  deviceMqs,
  deviceMqRanges,
  responsiveClassName,
  typescript: [
    {
      dest: 'packages/common/types/Responsive.ts',
      data: {
        types: {
          DeviceBreakpoint: deviceKeys,
          ResponsivePropsDevices: responsivePropsDevices,
        },
      },
    },
  ],
};
