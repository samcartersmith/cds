/* eslint-disable no-restricted-exports */

// BEWARE: enabling this bluries whether CDS is working or not - this was originally a hack for the font.
// import './global.css';

import '../../../.nx/dist/packages/web/globalStyles';

// Next.js has built-in i18n support: https://nextjs.org/docs/advanced-features/i18n-routing
// However, this *does not* work with static builds, which is our Nx default if you're
// deploying to Syn. With this approach, translations are fetched on the client-side.
// export { default } from '../src/AppStatic';

// If you're using dynamic builds (server-side rendering) and are deploying to Odin,
// you can enable Next.js built-in i18n support by removing the previous export,
// uncommenting the export below, and updating `next.config.js`.
export { default } from '../src/AppDynamic';
