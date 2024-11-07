---
to: packages/web/src/styles/borderRadius.ts
force: true
---

import { css } from 'linaria';
// eslint-disable-next-line no-restricted-imports
import { borderRadius as borderRadiusTokens } from '@cbhq/cds-common/tokens/borderRadius';

import { borderRadius } from "../tokens";

export const borderRadiusVariables = {
  <% Object.entries(configs.borderRadius).map(([alias, value]) => { _%>
    '<%- h.toCssVarSetter(`borderRadius`, alias) %>': `${borderRadiusTokens.<%- alias %>}px`,
  <% }) _%>
};

<% Object.entries(configs.borderRadius).map(([alias, value]) => { _%>
  export const <%- alias %> = css`
    border-radius: ${borderRadius.<%- alias %>};
  `;
<% }) %>