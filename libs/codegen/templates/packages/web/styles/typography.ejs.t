---
to: packages/web/typography/textStyles.ts
force: true
---
import { css } from 'linaria';

<%_ Object.entries(styles.typography).map(([key, value]) => { _%>
export const <%- key %>Styles = {
  <%_ Object.entries(value).map(([childKey, childValue]) => { _%>
    <%- h.camelCase(childKey) %>:  '<%- childValue %>',
  <%_ }) _%>
}
<%_ }) _%>

<%_ Object.entries(styles.typography).map(([key, value]) => { _%>
export const <%- key %> = css`${<%- key %>Styles}`;
<%_ }) _%>