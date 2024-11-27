import { css } from '@linaria/core';

import { createThemeCssVars } from '../../core/createThemeCssVars';
import { darkTheme } from '../dark';

export const darkThemeClassName = css`
  ${createThemeCssVars(darkTheme)}
`;
