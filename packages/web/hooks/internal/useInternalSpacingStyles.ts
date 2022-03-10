import { useMemo } from 'react';
import { InternalSpacingProps } from '@cbhq/cds-common';

import * as marginStyles from '../../styles/margin';
import * as paddingStyles from '../../styles/padding';
import { isRtl } from '../../utils/isRtl';
import { cx } from '../../utils/linaria';

export type UseInternalSpacingStylesProps = InternalSpacingProps;

export const useInternalSpacingStyles = ({
  all,
  bottom,
  end,
  horizontal,
  start,
  top,
  vertical,
  isInverted = false,
}: UseInternalSpacingStylesProps): string =>
  useMemo(() => {
    const spacingClasses = [];
    const styles = isInverted ? marginStyles : paddingStyles;

    if (all !== undefined) {
      spacingClasses.push(styles.all[all]);
    }

    if (vertical !== undefined) {
      spacingClasses.push(styles.top[vertical]);
      spacingClasses.push(styles.bottom[vertical]);
    }

    if (horizontal !== undefined) {
      spacingClasses.push(styles.left[horizontal]);
      spacingClasses.push(styles.right[horizontal]);
    }

    if (top !== undefined) {
      spacingClasses.push(styles.top[top]);
    }

    if (bottom !== undefined) {
      spacingClasses.push(styles.bottom[bottom]);
    }

    if (start !== undefined) {
      if (isRtl()) {
        spacingClasses.push(styles.right[start]);
      } else {
        spacingClasses.push(styles.left[start]);
      }
    }

    if (end !== undefined) {
      if (isRtl()) {
        spacingClasses.push(styles.left[end]);
      } else {
        spacingClasses.push(styles.right[end]);
      }
    }

    return cx(...spacingClasses);
  }, [all, top, bottom, start, end, vertical, horizontal, isInverted]);
