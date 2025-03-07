import { type StyleProp, type ViewStyle } from 'react-native';
import { ChipBaseProps } from '@cbhq/cds-common2/types';

import type { PressableInternalProps } from '../system';

export type ChipProps = ChipBaseProps &
  Omit<PressableInternalProps, 'children' | 'background' | 'onChange'> & {
    /** Apply styles to Chip content. */
    contentStyle?: StyleProp<ViewStyle>;
  };

export type InputChipProps = {
  /** Value indicates what is currently selected */
  value: string;
  /** Callback fired when Chip is pressed */
  onPress: PressableInternalProps['onPress'];
} & Omit<ChipProps, 'end' | 'inverted' | 'children'>;
