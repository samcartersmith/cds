import { DotVariant } from './DotBaseProps';
import { PinPlacement } from './Placement';

export type DotCountVariants = Extract<DotVariant, 'negative'>;

export type DotCountPinPlacement = Extract<PinPlacement, 'top-end'>;
