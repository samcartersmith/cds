import { LottieAnimationObject, LottieMarkersMap } from './types';

export function getDuration(source: LottieAnimationObject) {
  return frameToMs(source.op, source.fr);
}

// frame / frameRate and multiply by 1000 to convert to milliseconds
export function frameToMs(frame: number, fr: number) {
  return (frame / fr) * 1000;
}

export function getFrameRate(source: LottieAnimationObject) {
  return source.fr;
}

export function getMarkers<T extends LottieAnimationObject>(source: T) {
  return source.markers.reduce(
    (prev, next) => ({
      ...prev,
      [`${next.cm}`]: next.tm,
    }),
    {} as LottieMarkersMap<T>
  );
}
