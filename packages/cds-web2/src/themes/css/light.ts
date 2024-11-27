import { css } from '@linaria/core';

import { createThemeCssVars } from '../../core/createThemeCssVars';
import { lightTheme } from '../light';

export const lightThemeClassName = css`
  ${createThemeCssVars(lightTheme)}
`;
