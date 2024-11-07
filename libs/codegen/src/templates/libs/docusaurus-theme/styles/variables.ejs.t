---
to: libs/docusaurus-theme/src/css/variables.ts
force: true
---

export const baseVariables = {
  <%_ Object.entries(styles.scale.large).map(([key, value]) => { _%>
    '<%- key %>': '<%- value %>',
  <%_ }) _%>
  <% Object.entries(configs.borderWidth).map(([key, value]) => { _%>
    '<%- h.toCssVarSetter(`borderWidth`, key) %>': '<%- value %>px',
  <% }) _%>
  <% Object.entries(configs.borderRadius).map(([key, value]) => { _%>
    '<%- h.toCssVarSetter(`borderRadius`, key) %>': '<%- value %>px',
  <% }) _%>
};

export const lightVariables = {
  <% Object.entries(styles.spectrum.light).map(([key, value]) => { _%>
    '<%- key %>': '<%- value %>',
  <% }) _%>
  <% Object.entries(configs.palette.light).map(([key, value]) => { _%>
    '<%-key %>': '<%- value %>',
  <% }) _%>
};

export const darkVariables = {
  <% Object.entries(styles.spectrum.dark).map(([key, value]) => { _%>
    '<%- key %>': '<%- value %>',
  <% }) _%>
  <% Object.entries(configs.palette.dark).map(([key, value]) => { _%>
    '<%-key %>': '<%- value %>',
  <% }) _%>
};