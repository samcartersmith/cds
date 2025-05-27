/* eslint-disable simple-import-sort/exports */
/**
 * Following lines are a workaround to make hot-reloading work for CDS repo.
 * Linaria global styling needs to be exported and since globalStyle.ts has
 * no exports, it gets tree shaken in the process.
 * For real world use case these files are converted into .css files and are marked
 * as a side-effect in package.json. Thus all real world use cases can still
 * skip the workaround and just use:
 * ```
 * import '@cbhq/cds-icons/fonts/web/icon-font.css';
 * import '@cbhq/cds-web/defaultFontStyles';
 * import '@cbhq/cds-web/globalStyles';
 * ```
 */
import '@cbhq/cds-icons/fonts/web/icon-font.css';
export * as defaultFontCss from '@cbhq/cds-web/defaultFontStyles';
export { defaultFontStyles } from '@cbhq/cds-web/styles/defaultFont';

export * as globalCss from '@cbhq/cds-web/globalStyles';
export { globalStyles } from '@cbhq/cds-web/styles/global';

// Next.js has built-in i18n support: https://nextjs.org/docs/advanced-features/i18n-routing
// However, this *does not* work with static builds, which is our Nx default if you're
// deploying to Syn. With this approach, translations are fetched on the client-side.
// export { default } from '../src/AppStatic';

// If you're using dynamic builds (server-side rendering) and are deploying to Odin,
// you can enable Next.js built-in i18n support by removing the previous export,
// uncommenting the export below, and updating `next.config.js`.
export { default } from '../src/AppDynamic';
