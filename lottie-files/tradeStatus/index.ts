/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import { LottieSource } from '../LottieSource';
/* eslint-disable import/extensions */
import tradeStatusJson from './tradeStatus.json';

export type TradeStatusLottie = LottieSource<
  | 'loadingStart'
  | 'loadingEnd'
  | 'successCardStart'
  | 'successCardEnd'
  | 'successStart'
  | 'successEnd'
  | 'failureStart'
  | 'failureEnd'
  | 'pendingStart'
  | 'pendingEnd'
>;

export const tradeStatus = tradeStatusJson as TradeStatusLottie;
