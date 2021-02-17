import { LottieSource } from '@cds/common';

/* eslint-disable import/extensions */
import nuxJson from './nux.json';

/* 
  There is no way infer the types (to retrieve the actual marker or layer name
  instead of a string) from a JSON import https://github.com/microsoft/TypeScript/issues/32063
  Instead, we have to manually assert the marker/layer names if using the useLottieMarkers
  utitlity hook
*/
export type NuxLottie = LottieSource<'loopStart' | 'loopEnd'>;
export const nux = nuxJson as NuxLottie;
