import { PinningDirection } from '@cbhq/cds-common';
import { Position } from '@cbhq/cds-common/types/Position';

import * as pinStyles from '../styles/pin';
import * as positionStyles from '../styles/position';
import { cx } from '../utils/linaria';

export const usePinStyles = (pin?: PinningDirection, position?: Position) => {
  const styles = pin ? pinStyles[pin] : undefined;
  const positionStyle = position
    ? positionStyles[position === 'static' ? 'staticPosition' : position]
    : undefined;

  return cx(styles, positionStyle);
};
