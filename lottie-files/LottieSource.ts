/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
// This file is intentionally dependency free as codegen copies it to the lottie-files package
export interface LottieMarker<T extends string> {
  // Animation frame of marker
  tm: number;
  // Marker name
  cm: T;
  // Duration of marker
  dr: number;
}

// Serialized animation as generated from After Effects
export interface LottieSource<Marker extends string = string> {
  // Metadata for Lottie file
  meta: {
    [key: string]: unknown;
  };
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
    } & {
      [key: string]: unknown;
    }
  >;
  // Useful to play animations from/to certain frames.
  markers: LottieMarker<Marker>[];
}

export type LottieMarkersAsMap<T extends LottieSource> = {
  [key in T['markers'][number]['cm']]: number;
};
