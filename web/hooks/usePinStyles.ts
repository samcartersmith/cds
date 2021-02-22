import { PinningDirection } from '@cbhq/cds-common';

import * as styles from '../styles/pin';

export const usePinStyles = (pin?: PinningDirection) => {
  if (pin) {
    return styles[pin];
  }
};
