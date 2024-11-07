import { css } from 'linaria';

<% Object.entries(data).map(([name, styles]) => { %>
  export const <%- name %> = css`
    <%_ Object.entries(styles).map(([key, value]) => { _%>
      <%- key %>:  <%- value %>;
    <%_ }) _%>
  `;
<% }) %>
