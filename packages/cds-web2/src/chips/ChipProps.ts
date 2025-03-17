import type { ChipBaseProps } from '@cbhq/cds-common2/types';

import type { PressableDefaultElement, PressableProps } from '../system/Pressable';

export type ChipProps = ChipBaseProps &
  Omit<
    PressableProps<PressableDefaultElement>,
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
} & Omit<ChipProps, 'end' | 'inverted' | 'children' | 'noScaleOnPress'>;
