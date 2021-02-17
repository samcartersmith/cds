import { LottieMarkersAsMap } from './LottieMarkersAsMap';
import { LottieSource } from './LottieSource';

export interface LottieBasePlayerInstance<Source extends LottieSource> {
  play: (startFrame?: number, endFrame?: number) => void;
  playMarkers: (
    startFrame: keyof LottieMarkersAsMap<Source>,
    endFrame: keyof LottieMarkersAsMap<Source>
  ) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}
