---
to: packages/web/src/styles/borderWidth.ts
force: true
---

import { css } from 'linaria';
// eslint-disable-next-line no-restricted-imports
import { borderWidth as borderWidthTokens } from '@cbhq/cds-common/tokens/borderWidth';

import { borderWidth } from "../tokens";

export const borderWidthVariables = {
  <% Object.entries(configs.borderWidth).map(([alias, value]) => { _%>
    '<%- h.toCssVarSetter(`borderWidth`, alias) %>': `${borderWidthTokens.<%- alias %>}px`,
  <% }) _%>
};

<% Object.entries(configs.borderWidth).map(([alias, value]) => { %>
  export const <%- alias %> = css`
    border-width: ${borderWidth.<%- alias %>};
  `;
<% }) %>