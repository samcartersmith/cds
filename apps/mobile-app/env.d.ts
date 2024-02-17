// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="detox" />

declare module 'process' {
  global {
    export const testFailed: boolean;
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
      interface ProcessEnv {
        readonly APP_DEBUG?: `${0 | 1}`;
        readonly APP_JS_ENGINE?: 'jsc' | 'hermes';
        readonly APP_PLATFORM: 'ios' | 'android';
        readonly APP_NAME?: string;
        readonly APP_NEW_ARCH_ENABLED?: `${0 | 1}`;
        readonly APP_PROFILE?: 'debug' | 'release';
      }
    }
  }
}
