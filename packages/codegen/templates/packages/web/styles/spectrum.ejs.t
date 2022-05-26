---
to: packages/web/styles/spectrum.ts
force: true
---
import { css } from 'linaria';

export const darkVariables = <%- JSON.stringify(styles.spectrum.dark) %>

export const lightVariables = <%- JSON.stringify(styles.spectrum.light) %>

export const frontierDarkVariables = <%- JSON.stringify(styles.spectrum.frontierDark) %>

export const frontierLightVariables = <%- JSON.stringify(styles.spectrum.frontierLight) %>

export const dark = css`${darkVariables}`;

export const light = css`${lightVariables}`;

export const frontierDark = css`${frontierDarkVariables}`;

export const frontierLight = css`${frontierLightVariables}`;