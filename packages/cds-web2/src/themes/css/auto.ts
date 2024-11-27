import { css } from '@linaria/core';

import { createThemeCssVars } from '../../core/createThemeCssVars';
import { autoTheme } from '../auto';

export const autoThemeClassName = css`
  ${createThemeCssVars(autoTheme)}
`;
