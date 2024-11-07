---
to: packages/web/src/styles/responsive.ts
force: true
---

<%- include(partial.cssDeviceMap, { data: styles.responsiveConfig }); %>

export const responsiveClassName = '<%- styles.responsiveClassName %>'