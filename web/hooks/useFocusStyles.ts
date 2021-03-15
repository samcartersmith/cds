import { css } from 'linaria';
import { useFocusVisible } from 'react-aria';

import { palette } from '../tokens';

export const focusStyles = css`
  position: relative;
  &:focus {
    &:before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border: 2px solid ${palette.primary};
      border-radius: inherit;
    }
  }
`;

export const useFocusStyles = (isTextInput: boolean | undefined = false) => {
  const { isFocusVisible } = useFocusVisible({ isTextInput });

  return isFocusVisible && focusStyles;
};
