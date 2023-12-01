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
import { KeysOfUnion, objectKeys } from '../utils/types';

type OffsetKeys = keyof OffsetProps;
type SpacingKeys = keyof SpacingProps;
type CellSpacingKeys = KeysOfUnion<CellSpacing>;

export const getDeviceStyles = (
  deviceConfig: CellSpacingConfig,
  device: ResponsivePropsDevices,
) => {
  const innerPaddingClassNames: string[] = [];
  const outerPaddingClassNames: string[] = [];

  const { innerSpacing, outerSpacing, innerPadding, outerPadding } = deviceConfig;

  if (innerSpacing) {
    const styleKeys = Object.keys(innerSpacing) as CellSpacingKeys[];

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = innerSpacing[style];
      if (style.toString().startsWith('spacing') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        innerPaddingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('offset') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        innerPaddingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  if (outerSpacing) {
    const styleKeys = Object.keys(outerSpacing) as CellSpacingKeys[];

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = outerSpacing[style];
      if (style.toString().startsWith('spacing') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        outerPaddingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('offset') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        outerPaddingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  if (innerPadding) {
    const styleKeys = objectKeys(innerPadding);

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = innerPadding[style];
      if (style.toString().startsWith('padding') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        innerPaddingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('margin') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        innerPaddingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  if (outerPadding) {
    const styleKeys = objectKeys(outerPadding);

    styleKeys.forEach((style: SpacingKeys | OffsetKeys) => {
      const value = outerPadding[style];
      if (style.toString().startsWith('padding') && value) {
        const deviceSpacingClasses = getResponsiveSpacingStyles(device, style, value);
        outerPaddingClassNames.push(deviceSpacingClasses);
      } else if (style.toString().startsWith('margin') && value) {
        const deviceOffsetClasses = getResponsiveSpacingStyles(device, style, value, true);
        outerPaddingClassNames.push(deviceOffsetClasses);
      }
    });
  }

  return {
    innerSpacingClassNames: innerPaddingClassNames,
    outerSpacingClassNames: outerPaddingClassNames,
    innerPaddingClassNames,
    outerPaddingClassNames,
  };
};

export const useResponsiveCellSpacingStyles = (
  responsiveConfig: ResponsiveCellSpacingProps | undefined,
) => {
  const innerPaddingDeviceClassNames: string[] = useMemo(() => [], []);
  const outerPaddingDeviceClassNames: string[] = useMemo(() => [], []);

  if (responsiveConfig) {
    const deviceKeys = Object.keys(responsiveConfig) as ResponsivePropsDevices[];

    deviceKeys?.forEach((device) => {
      const { innerPaddingClassNames, outerPaddingClassNames } = getDeviceStyles(
        responsiveConfig[device] as CellSpacingConfig,
        device,
      );
      innerPaddingDeviceClassNames.push(...innerPaddingClassNames);
      outerPaddingDeviceClassNames.push(...outerPaddingClassNames);
    });
  }
  return useMemo(
    () => ({
      responsiveInnerSpacing: cx(...innerPaddingDeviceClassNames),
      responsiveOuterSpacing: cx(...outerPaddingDeviceClassNames),
      responsiveInnerPadding: cx(...innerPaddingDeviceClassNames),
      responsiveOuterPadding: cx(...outerPaddingDeviceClassNames),
    }),
    [innerPaddingDeviceClassNames, outerPaddingDeviceClassNames],
  );
};
