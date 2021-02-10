import { PaletteAlias } from '@cds/common';
import { AnyObject } from '@cds/utils';

// Serialized animation as generated from After Effects
export interface LottieAnimationObject {
  // Metadata for Lottie file
  meta: AnyObject;
  // Lottie After Effects plugin version
  v: string;
  // Frame rate of animation
  fr: number;
  // Initial frame
  ip: number;
  // Last frame
  op: number;
  // Width of composition
  w: number;
  // Height of composition
  h: number;
  // Name of composition
  nm: string;
  // 3d layer flag
  ddd: number;
  // File path for any static assets a lottie animation may use
  assets: unknown[];
  // Apply color overrides via layer name
  layers: Array<
    {
      // Layer name
      nm: string;
      // Class name that can be applied to path for Lottie animation on web. Has to use svg renderer
      cl?: string;
    } & AnyObject
  >;
  // Useful to play animations from/to certain frames.
  markers: LottieMarker[];
}

interface LottieMarker<T extends string = string> {
  // Animation frame of marker
  tm: number;
  // Marker name
  cm: T;
  // Duration of marker
  dr: number;
}

export interface LottieWithMarkerNames<T extends string> extends LottieAnimationObject {
  markers: Array<
    LottieMarker & {
      cm: T;
    }
  >;
}

export type LottieMarkersMap<T extends LottieAnimationObject> = {
  [key in T['markers'][number]['cm']]: number;
};

export type LottieRemoteAsset = { uri: string };
export type LottieSource = LottieAnimationObject;
export type LottieColorFilter = Array<{ keypath: PaletteAlias; color: string }>;
