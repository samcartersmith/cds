import { isExpectedSimulator } from './utils';

export const defaultPixelsToScroll = isExpectedSimulator() ? 700 : 500; // TODO: get exact heights by device.
