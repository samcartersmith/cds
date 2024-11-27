import { css } from '@linaria/core';

<% Object.entries(data).map(([device, styles]) => { %>
  export const <%- device %>Styles = {
    <%_ Object.entries(styles).map(([style, variants]) => { %>
        <%- style %>: {
          <%_ Object.entries(variants).map(([variant, values]) => { %>
            <%- variant %>: {
              <%_ Object.entries(values).map(([value, className]) => { %>
                <%- value %>:  css`<%- className %>`,
              <% }) %>
            } ,
          <%_ }) %>
        } ,
    <%_ }) %>
  }
<%_ }) %>
