---
to: packages/common/tokens/borderRadius.ts
force: true
---

export const borderRadius = {
  <% Object.entries(configs.borderRadiusDeprecated).map(([alias, value]) => { _%>
    /** @deprecated Please use new rounded-xyz values */
    <%- alias %>: <%- value %>,
  <% }) _%>
  <% Object.entries(configs.borderRadius).map(([alias, value]) => { _%>
    <%- alias %>: <%- value %>,
  <% }) _%>
} as const;