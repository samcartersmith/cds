import { isExpectedIosDevice } from './utils';

export const iOSDefaultPixelsToScroll = isExpectedIosDevice() ? 700 : 500;
export const androidDefaultPixelsToScroll = isExpectedIosDevice() ? 600 : 500;
