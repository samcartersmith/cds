function isEnv(env: 'development' | 'production' | 'test') {
  return Boolean(typeof process === 'object' && process?.env?.NODE_ENV === env);
}

export const isDevelopment = () => {
  return isEnv('development');
};

export const isProduction = () => {
  return isEnv('production');
};

export const isTest = () => {
  return isEnv('test');
};

export const isStorybook = () => {
  // @ts-expect-error STORYBOOK_SKIP_ANIMATION is injected with DefinePulgin as a global var
  return Boolean(typeof process === 'object' && process?.env?.STORYBOOK_SKIP_ANIMATION) || typeof STORYBOOK_SKIP_ANIMATION !== 'undefined';
};

export const getFigmaAccessToken: () => string = () => {
  // @ts-expect-error FIGMA_ACCESS_TOKEN is included globally with DefinePlugin
  return typeof FIGMA_ACCESS_TOKEN !== "undefined" ? (FIGMA_ACCESS_TOKEN as string) : process.env.FIGMA_ACCESS_TOKEN ?? '';
}