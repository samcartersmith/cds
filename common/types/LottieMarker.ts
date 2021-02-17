export interface LottieMarker<T extends string = string> {
  // Animation frame of marker
  tm: number;
  // Marker name
  cm: T;
  // Duration of marker
  dr: number;
}
