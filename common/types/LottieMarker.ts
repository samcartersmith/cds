export interface LottieMarker<T extends string> {
  // Animation frame of marker
  tm: number;
  // Marker name
  cm: T;
  // Duration of marker
  dr: number;
}
