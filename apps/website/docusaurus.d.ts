/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-blog" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />
/// <reference types="@docusaurus/theme-classic" />
/// <reference types="@cbhq/docusaurus-plugin-docgen" />
/// <reference types="@cbhq/docusaurus-plugin-kbar" />

declare module '@theme/TOCManager' {
  export const useTOC: typeof import('@theme/createTOCManager').useTOC;
  export const TOCProvider: typeof import('@theme/createTOCManager').TOCProvider;
  export const TOCUpdater: typeof import('@theme/createTOCManager').TOCUpdater;
}
