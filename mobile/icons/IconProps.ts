import type { PaletteForeground, IconBaseProps, SharedProps } from '@cbhq/cds-common';
import type { IconName } from '@cbhq/cds-common/types/IconName';
import type { TextStyle } from 'react-native';

import type { DangerouslySetStyle } from '../types';
import { BadgeProps } from './Badge';

export interface IconProps
  extends Omit<IconBaseProps, 'name'>,
    SharedProps,
    DangerouslySetStyle<TextStyle> {
  /**
   * Add a badge to the top right of an icon
   */
  badge?: React.ReactElement<BadgeProps>;
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground;
  /** Icon names */
  name: IconName;
}
