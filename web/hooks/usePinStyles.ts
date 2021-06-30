import { PinningDirection } from '@cbhq/cds-common';

import * as styles from '../styles/pin';

export const usePinStyles = (pin?: PinningDirection) => {
  return pin ? styles[pin] : undefined;
};
