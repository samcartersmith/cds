import { LottieMarkersAsMap, LottieSource } from '../types';

// frame / frameRate and multiply by 1000 to convert to milliseconds
export function getLottieFrameToMs(frame: number, fr: number) {
  return (frame / fr) * 1000;
}

export function getLottieDuration(source: LottieSource) {
  return getLottieFrameToMs(source.op, source.fr);
}

export function getLottieFrameRate(source: LottieSource) {
  return source.fr;
}

export function getLottieMarkers<T extends LottieSource>(source: T) {
  return source.markers.reduce(
    (prev, next) => ({
      ...prev,
      [`${next.cm}`]: next.tm,
    }),
    {} as LottieMarkersAsMap<T>,
  );
}
