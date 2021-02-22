import type { PaletteForeground, IconBaseProps } from '@cbhq/cds-common';
import type { TextStyle } from 'react-native';

import type { DangerouslySetStyle } from '../types';

export interface IconProps extends IconBaseProps, DangerouslySetStyle<TextStyle> {
  color?: PaletteForeground;
}
