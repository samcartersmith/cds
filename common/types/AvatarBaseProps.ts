import { PaletteBorder, Shape } from '.';
import { SharedProps } from './SharedProps';
import { AvatarSize } from './AvatarSize';

export type AvatarShape = Exclude<Shape, 'rectangle' | 'squircle'>;
export type AvatarFallback = 'image' | 'text';

export type AvatarBaseProps = {
  /** This is the name associated with the entity in the Avatar. This is used in the image alt tag for accessibility. */
  alt: string;

  /** Absolute url to the image that should be shown in the Avatar. If no src is provided then a generic fallback image is used. */
  src?: string;

  /** Shape of Avatar */
  shape?: AvatarShape;

  /** Size for a given avatar. */
  size?: AvatarSize;

  /** Adds a border to the Avatar */
  borderColor?: PaletteBorder;
} & SharedProps;
