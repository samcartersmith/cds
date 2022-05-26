import { css } from 'linaria';

<% Object.entries(data).map(([name, classes]) => { %>
  export const <%- name %> = {
    <%_ Object.entries(classes).map(([key, value]) => { _%>
      <%- key %>:  css`<%- value %>`,
    <%_ }) _%>
  }
<% }) %>
