import { css } from '@linaria/core';

<% Object.entries(data).map(([name, styles]) => { %>
  export const <%- name %> = css`
    <%_ Object.entries(styles).map(([key, value]) => { _%>
      <%- key %>:  <%- value %>;
    <%_ }) _%>
  `;
<% }) %>
