import React from 'react';

import type { IconName } from './IconName';
import type { IconSize } from './IconSize';
import type { SharedProps } from './SharedProps';
import type { SpacingProps } from './SpacingProps';

export type IconBaseProps = {
  /** Size for a given icon. */
  size: IconSize;
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /**
   * A boolean flag indicating whether or not a border should be shown around an icon.
   * This border will match color prop. Border is only allowed for sizes m and above.
   * @default false
   */
  bordered?: boolean;
  /**
   * Fallback element to render if unable to find an icon with matching name
   * @default null
   * */
  fallback?: null | React.ReactElement;
} & SpacingProps &
  SharedProps;
