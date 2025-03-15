/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_CONTENTFUL_SPACE_ID: string;
  readonly VITE_CONTENTFUL_TOKEN: string;
  readonly VITE_CONTENTFUL_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
