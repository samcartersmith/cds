import { PinningDirection } from '@cds/common';

import * as styles from '../styles/pin';

export const usePinStyles = (pin?: PinningDirection) => {
  if (pin) {
    return styles[pin];
  }
};
