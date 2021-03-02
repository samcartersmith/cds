import { FlexStyles } from '@cbhq/cds-common';
import { cx } from 'linaria';

import * as styles from '../styles/flexStyles';

export const useFlexStyles = ({
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  flexWrap,
  justifyContent,
}: FlexStyles) => {
  return cx(
    styles.flex,
    alignContent && styles.alignContent[alignContent],
    alignItems && styles.alignItems[alignItems],
    alignSelf && styles.alignSelf[alignSelf],
    flexDirection && styles.flexDirection[flexDirection],
    flexWrap && styles.flexWrap[flexWrap],
    justifyContent && styles.justifyContent[justifyContent]
  );
};
