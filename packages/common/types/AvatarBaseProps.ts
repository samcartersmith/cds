import { AvatarSize } from './AvatarSize';
import { PaletteBorder } from './Palette';
import { Shape } from './Shape';
import { SharedProps } from './SharedProps';
import { SpectrumHue } from './Spectrum';

export type AvatarShape = Exclude<Shape, 'rectangle' | 'squircle'>;
export type AvatarFallback = 'image' | 'text';
export type FallbackColor = Extract<
  SpectrumHue,
  'blue' | 'purple' | 'green' | 'teal' | 'pink' | 'gray'
>;

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

  /**
   * @danger Creates a custom Avatar size. The size prop should be used in most circumstances.
   * This is an escape hatch when using the Avatar in a fixed size container where you cannot control the dimensions.
   */
  dangerouslySetSize?: number;

  /**
   * Override the default fallback background and border color
   * @default blue
   */
  colorScheme?: FallbackColor;

  /** This is the name associated with the Avatar's entity. It will be used to generate a fallback. */
  name?: string;
} & SharedProps;
