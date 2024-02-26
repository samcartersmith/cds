import { ChipBaseProps } from '@cbhq/cds-common/types';

import { OnPress, PressableInternalProps } from '../system';

export type ChipProps = ChipBaseProps &
  Omit<PressableInternalProps, 'children' | 'background' | 'onChange'>;

export type InputChipProps = {
  /** Value indicates what is currently selected */
  value: string;
  /** Callback fired when Chip is pressed */
  onPress: OnPress;
} & Omit<ChipProps, 'end' | 'inverted' | 'children'>;
