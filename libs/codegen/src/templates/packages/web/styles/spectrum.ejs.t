---
to: packages/web/src/styles/spectrum.ts
force: true
---
import { css } from 'linaria';

export const darkVariables = <%- JSON.stringify(styles.spectrum.dark) %>

export const lightVariables = <%- JSON.stringify(styles.spectrum.light) %>

export const dark = css`${darkVariables}`;

export const light = css`${lightVariables}`;