import { isExpectedAndroidDevice, isExpectedIosDevice } from './utils';

export const iOSDefaultPixelsToScroll = isExpectedIosDevice() ? 700 : 500;
export const androidDefaultPixelsToScroll = isExpectedAndroidDevice() ? 600 : 500;
