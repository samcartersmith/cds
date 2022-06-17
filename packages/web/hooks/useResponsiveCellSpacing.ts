import { useMemo } from 'react';
import {
  CellSpacing,
  CellSpacingConfig,
  OffsetProps,
  ResponsiveCellSpacingProps,
  ResponsivePropsDevices,
  SpacingProps,
} from '@cbhq/cds-common';

import { getResponsiveSpacingStyles } from '../utils/getResponsiveSpacingStyles';
import { cx } from '../utils/linaria';
import { KeysOfUnion } from '../utils/types';

type OffsetKeys = keyof OffsetProps;
type SpacingKeys = keyof SpacingProps;
type CellSpacingKeys = KeysOfUnion<CellSpacing>;

const getDeviceStyles = (deviceConfig: CellSpacingConfig, device: ResponsivePropsDevices) => {
  const innerSpacingClassNames: string[] = [];
  const outerSpacingClassNames: string[] = [];

  const { innerSpacing, outerSpacing } = deviceConfig;

  if (innerSpacing) {
    const styleKeys = Object.keys(innerSpacing) as CellSpacingKeys[];

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = innerSpacing[style];
      if (style.toString().startsWith('spacing') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        innerSpacingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('offset') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        innerSpacingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  if (outerSpacing) {
    const styleKeys = Object.keys(outerSpacing) as CellSpacingKeys[];

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = outerSpacing[style];
      if (style.toString().startsWith('spacing') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        outerSpacingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('offset') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        outerSpacingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  return { innerSpacingClassNames, outerSpacingClassNames };
};

export const useResponsiveCellSpacingStyles = (
  responsiveConfig: ResponsiveCellSpacingProps | undefined,
) => {
  const innerSpacingDeviceClassNames: string[] = useMemo(() => [], []);
  const outerSpacingDeviceClassNames: string[] = useMemo(() => [], []);

  if (responsiveConfig) {
    const deviceKeys = Object.keys(responsiveConfig) as ResponsivePropsDevices[];

    deviceKeys?.forEach((device) => {
      const { innerSpacingClassNames, outerSpacingClassNames } = getDeviceStyles(
        responsiveConfig[device] as CellSpacingConfig,
        device,
      );
      innerSpacingDeviceClassNames.push(...innerSpacingClassNames);
      outerSpacingDeviceClassNames.push(...outerSpacingClassNames);
    });
  }
  return useMemo(
    () => ({
      responsiveInnerSpacing: cx(...innerSpacingDeviceClassNames),
      responsiveOuterSpacing: cx(...outerSpacingDeviceClassNames),
    }),
    [innerSpacingDeviceClassNames, outerSpacingDeviceClassNames],
  );
};
