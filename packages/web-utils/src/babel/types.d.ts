declare module 'linaria/babel' {
  import type { TransformOptions, ConfigAPI } from '@babel/core';

  export default function preset(
    babel: ConfigAPI,
    options: Record<string, unknown>,
    cwd: string,
  ): TransformOptions;
}
