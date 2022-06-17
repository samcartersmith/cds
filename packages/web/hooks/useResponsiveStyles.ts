import { useMemo } from 'react';
import {
  OffsetProps,
  ResponsiveProps,
  ResponsivePropsDevices,
  ResponsiveStyles,
  SpacingProps,
  SpacingScale,
} from '@cbhq/cds-common/types';

import { desktopStyles, phoneStyles, tabletStyles } from '../styles/responsive';
import { getResponsiveSpacingStyles } from '../utils/getResponsiveSpacingStyles';
import { cx } from '../utils/linaria';
import { KeysOfUnion } from '../utils/types';

const deviceStyles: Record<ResponsivePropsDevices, unknown> = {
  phone: phoneStyles,
  tablet: tabletStyles,
  desktop: desktopStyles,
};

type OffsetKeys = keyof OffsetProps;
type SpacingKeys = keyof SpacingProps;
type ResponsiveStylesKeys = KeysOfUnion<ResponsiveStyles>;

const getDeviceStyles = (deviceConfig: ResponsiveStyles, device: ResponsivePropsDevices) => {
  const classNames: string[] = [];
  const styleKeys = Object.keys(deviceConfig) as ResponsiveStylesKeys[];

  styleKeys.forEach((style) => {
    const value = deviceConfig[style];
    if (style.toString().startsWith('spacing')) {
      const deviceSpacingClasses = getResponsiveSpacingStyles(
        device,
        style as SpacingKeys,
        value as SpacingScale,
      );
      classNames.push(deviceSpacingClasses);
    } else if (style.toString().startsWith('offset')) {
      const deviceOffsetClasses = getResponsiveSpacingStyles(
        device,
        style as OffsetKeys,
        value as SpacingScale,
        true,
      );
      classNames.push(deviceOffsetClasses);
    } else {
      // @ts-expect-error  Can't index every possible phone style
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      classNames.push(deviceStyles[device][style][value]);
    }
  });

  return classNames;
};

export const useResponsiveStyles = (responsiveConfig?: ResponsiveProps) => {
  const classNames: string[] = useMemo(() => [], []);

  if (responsiveConfig) {
    const deviceKeys = Object.keys(responsiveConfig) as ResponsivePropsDevices[];

    deviceKeys?.forEach((device) => {
      classNames.push(...getDeviceStyles(responsiveConfig[device] as ResponsiveStyles, device));
    });
  }

  return useMemo(() => cx(...classNames), [classNames]);
};
