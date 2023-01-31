/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/plugin-content-blog" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />
/// <reference types="@docusaurus/theme-classic" />

/// <reference types="@cbhq/docusaurus-plugin-docgen/module-declarations" />
/// <reference types="@cbhq/docusaurus-plugin-kbar" />
/// <reference types="@cbhq/docusaurus-theme" />

declare module 'dayjs-recur';

declare module '@site/static/data/illustration/releaseHistory.json' {
  type ReleaseHistory = {
    newIllustrations: string[];
    modifiedIllustrations: string[];
    deletedIllustrations: string[];
  };

  const data: Record<string, ReleaseHistory>;
  export default data;
}
