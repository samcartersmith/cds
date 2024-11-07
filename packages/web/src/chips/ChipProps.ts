import { ChipBaseProps } from '@cbhq/cds-common/types';

import { OnPress, PressableInternalProps } from '../system';

export type ChipProps = ChipBaseProps &
  Omit<
    PressableInternalProps,
    | 'as'
    | 'children'
    | 'loading'
    | 'background'
    | 'start'
    | 'numberOfLines'
    | 'accessibilityHint'
    | 'accessibilityLabelledBy'
    | 'onChange'
  > & {
    /** Apply styles to Chip content. */
    contentStyle?: React.CSSProperties;
  };

export type InputChipProps = {
  /** Value indicates what is currently selected */
  value: string;
  /** Callback fired when Chip is pressed */
  onPress: OnPress;
} & Omit<ChipProps, 'end' | 'inverted' | 'children' | 'noScaleOnPress'>;
