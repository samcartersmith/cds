import type { CardBaseProps } from './CardBaseProps';
import type { CardBodyBaseProps } from './CardBodyBaseProps';

export type FeatureEntryCardBaseProps<T> = CardBaseProps<T> & CardBodyBaseProps<T>;
