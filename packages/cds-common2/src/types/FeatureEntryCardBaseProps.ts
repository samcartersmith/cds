import type { CardBaseProps } from './CardBaseProps';
import type { CardBodyBaseProps } from './CardBodyBaseProps';
import { SharedAccessibilityProps } from './SharedAccessibilityProps';

export type FeatureEntryCardBaseProps = CardBaseProps &
  CardBodyBaseProps &
  Pick<SharedAccessibilityProps, 'accessibilityHint' | 'accessibilityLabel'>;
