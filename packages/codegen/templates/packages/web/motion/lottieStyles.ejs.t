---
to: packages/web/animation/lottieStyles.ts
force: true
---
import { css } from 'linaria';

import { palette } from '../tokens';

export const lottieStyles = css`
<% Object.keys(configs.defaultPalette).map(paletteAlias => { %>
  .palette_<%- paletteAlias %> {
    &_stroke {
      stroke: ${palette.<%- paletteAlias %>};
    }
    &_fill {
      fill: ${palette.<%- paletteAlias %>};
    }
  }
<%_ }) _%>
`;
