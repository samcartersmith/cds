import { focusedStyle, unfocusedStyle } from '@cbhq/cds-common/tokens/input';
import { useMemo } from 'react';
import { css } from 'linaria';

/**
 *
 * @param focused
 * @param position
 * @returns
 */
export const useInputBorderStyle = (focused: boolean) => {
  return useMemo(() => {
    if (focused) {
      const outStyle = {
        ...focusedStyle,
        marginTop: -1,
        marginLeft: -1,
        marginRight: -1,
        marginBottom: -1,
      };
      return css`
        ${outStyle}
      `;
    }

    return css`
      ${unfocusedStyle}
    `;
  }, [focused]);
};
