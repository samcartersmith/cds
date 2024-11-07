import { css } from 'linaria';

<% Object.entries(data).map(([device, styles]) => { %>
  export const <%- device %>Styles = {
    <%_ Object.entries(styles).map(([style, values]) => { %>
        <%- style %>: {
            <%_ Object.entries(values).map(([value, className]) => { %>
            <%- value %>:  css`<%- className %>`,
            <% }) %>
        } ,
    <%_ }) %>
  }
<%_ }) %>
