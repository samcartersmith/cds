import type { ChipBaseProps } from '@cbhq/cds-common2/types';

import type { PressableInternalProps } from '../system/Pressable';

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
