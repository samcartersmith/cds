import type { PaletteForeground, IconBaseProps } from '@cbhq/cds-common';
import type { TextStyle } from 'react-native';

import type { DangerouslySetStyle } from '../types';

export interface IconProps extends IconBaseProps, DangerouslySetStyle<TextStyle> {
  /** Color of the icon when used as a foreground. */
  color?: PaletteForeground;
}
