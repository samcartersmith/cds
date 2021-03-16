import { useMemo } from 'react';

import { SpacingScale } from '@cbhq/cds-common';
import { cx } from 'linaria';

import * as marginStyles from '../../styles/margin';
import * as paddingStyles from '../../styles/padding';
import { isRtl } from '../../utils/isRtl';

export interface UseInternalSpacingStylesProps {
  all?: SpacingScale;
  top?: SpacingScale;
  bottom?: SpacingScale;
  start?: SpacingScale;
  end?: SpacingScale;
  horizontal?: SpacingScale;
  vertical?: SpacingScale;
  isInverted?: boolean;
}

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

    if (all) {
      spacingClasses.push(styles.all[all]);
    }

    if (vertical) {
      spacingClasses.push(styles.top[vertical]);
      spacingClasses.push(styles.bottom[vertical]);
    }

    if (horizontal) {
      spacingClasses.push(styles.left[horizontal]);
      spacingClasses.push(styles.right[horizontal]);
    }

    if (top) {
      spacingClasses.push(styles.top[top]);
    }

    if (bottom) {
      spacingClasses.push(styles.bottom[bottom]);
    }

    if (start) {
      if (isRtl()) {
        spacingClasses.push(styles.right[start]);
      } else {
        spacingClasses.push(styles.left[start]);
      }
    }

    if (end) {
      if (isRtl()) {
        spacingClasses.push(styles.left[end]);
      } else {
        spacingClasses.push(styles.right[end]);
      }
    }

    return cx(...spacingClasses);
  }, [all, top, bottom, start, end, vertical, horizontal, isInverted]);
