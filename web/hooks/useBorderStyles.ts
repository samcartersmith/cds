import { BorderedStyles } from '@cbhq/cds-common';
import { cx } from 'linaria';

import * as styles from '../styles/borderStyles';

export const useBorderStyles = ({
  bordered,
  borderedTop,
  borderedBottom,
  borderedStart,
  borderedEnd,
  borderedHorizontal,
  borderedVertical,
}: BorderedStyles) => {
  return cx(
    bordered && styles.bordered,
    borderedTop && styles.borderedTop,
    borderedBottom && styles.borderedBottom,
    borderedStart && styles.borderedStart,
    borderedEnd && styles.borderedEnd,
    borderedHorizontal && styles.borderedHorizontal,
    borderedVertical && styles.borderedVertical
  );
};
