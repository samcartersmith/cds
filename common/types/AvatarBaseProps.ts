import { PaletteBorder, Shape } from '.';

export type AvatarShape = Exclude<Shape, 'rectangle'>;
export type AvatarFallback = 'image' | 'text';

export type AvatarBaseProps = {
  /** This is the name associated with the entity in the Avatar. This is used in the image alt tag for accessibility.
   * If no image is provided the first letter is used for the text avatar. */
  name: string;

  /** Absolute url to the image that should be shown in the Avatar */
  src?: string;

  /** Shape of Avatar */
  shape?: AvatarShape;

  /** Custom Avatar size in px */
  size?: number;

  /** Shows the Avatar in compact size */
  compact?: boolean;

  /** Adds a border to the Avatar */
  borderColor?: PaletteBorder;
};
