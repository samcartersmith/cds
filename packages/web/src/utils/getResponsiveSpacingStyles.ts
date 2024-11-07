import { OffsetProps, ResponsivePropsDevices, SpacingProps, SpacingScale } from '@cbhq/cds-common';

import { desktopStyles, phoneStyles, tabletStyles } from '../styles/responsiveSpacing';

import { isRtl } from './isRtl';
import { cx } from './linaria';

const spacingStyles = {
  desktop: desktopStyles,
  tablet: tabletStyles,
  phone: phoneStyles,
};

type OffsetKeys = keyof OffsetProps;
type SpacingKeys = keyof SpacingProps;

export const getResponsiveSpacingStyles = (
  device: ResponsivePropsDevices,
  spacing: OffsetKeys | SpacingKeys,
  value: SpacingScale,
  isInverted?: boolean,
): string => {
  const spacingClasses = [];
  const style = isInverted ? 'margin' : 'padding';
  const deviceStyles = spacingStyles[device][style];

  if (spacing === 'spacing' || spacing === 'offset') {
    spacingClasses.push(deviceStyles.all[value]);
  }

  if (spacing.endsWith('Vertical')) {
    spacingClasses.push(deviceStyles.top[value]);
    spacingClasses.push(deviceStyles.bottom[value]);
  }

  if (spacing.endsWith('Horizontal')) {
    spacingClasses.push(deviceStyles.left[value]);
    spacingClasses.push(deviceStyles.right[value]);
  }

  if (spacing.endsWith('Top')) {
    spacingClasses.push(deviceStyles.top[value]);
  }

  if (spacing.endsWith('Bottom')) {
    spacingClasses.push(deviceStyles.bottom[value]);
  }

  if (spacing.endsWith('Start')) {
    if (isRtl()) {
      spacingClasses.push(deviceStyles.right[value]);
    } else {
      spacingClasses.push(deviceStyles.left[value]);
    }
  }

  if (spacing.endsWith('End')) {
    if (isRtl()) {
      spacingClasses.push(deviceStyles.left[value]);
    } else {
      spacingClasses.push(deviceStyles.right[value]);
    }
  }

  return cx(...spacingClasses);
};
