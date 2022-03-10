import type { CardBaseProps } from './CardBaseProps';
import type { CardBodyBaseProps } from './CardBodyBaseProps';

export type AnnouncementCardBaseProps<T> = CardBaseProps<T> & CardBodyBaseProps<T>;
