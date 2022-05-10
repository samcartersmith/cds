---
to: packages/web/tokens.ts
force: true
---


/** The values for these CSS variables are defined in [styles/borderRadius](./styles/borderRadius.ts) */
export const borderRadius = {
  <% Object.entries(configs.borderRadiusDeprecated).map(([alias, value]) => { _%>
    /** @deprecated Please use new rounded prefixed values */
    <%- alias %>: '<%- h.toCssVarGetter(`borderRadius`, alias) %>',
  <% }) _%>
  <% Object.entries(configs.borderRadius).map(([alias, value]) => { _%>
      <%- alias %>: '<%- h.toCssVarGetter(`borderRadius`, alias) %>',
  <% }) _%>
} as const

/** The values for these CSS variables are defined in [styles/borderWidth](./styles/borderWidth.ts) */
export const borderWidth = {
  <% Object.entries(configs.borderWidth).map(([alias, value]) => { _%>
      <%- alias %>: '<%- h.toCssVarGetter(`borderWidth`, alias) %>',
  <% }) _%>
} as const

<%- include(partial.objectMap, { data: tokens }); %>