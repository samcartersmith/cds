import { LottieSource } from './LottieSource';

export type LottieMarkersAsMap<T extends LottieSource> = {
  [key in T['markers'][number]['cm']]: number;
};
