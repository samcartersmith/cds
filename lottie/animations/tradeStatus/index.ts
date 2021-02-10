import { LottieWithMarkerNames } from '../../types';
/* eslint-disable import/extensions */
import tradeStatusJson from './tradeStatus.json';
/* 
  There is no way infer the types (to retrieve the actual marker or layer name
  instead of a string) from a JSON import https://github.com/microsoft/TypeScript/issues/32063
  Instead, we have to manually assert the marker/layer names if using the useLottieMarkers
  utitlity hook
*/
export const tradeStatus = tradeStatusJson as LottieWithMarkerNames<
  | 'loadingStart'
  | 'loadingEnd'
  | 'successStart'
  | 'successEnd'
  | 'successCardStart'
  | 'successCardEnd'
  | 'failureStart'
  | 'failureEnd'
  | 'pendingStart'
  | 'pendingEnd'
>;
