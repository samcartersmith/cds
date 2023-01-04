import { optimize } from 'svgo';

import svgoConfig from './svgoConfig';

export function optimizeSvg(content: string): string {
  const optimizedSvg = optimize(content, svgoConfig);
  if ('data' in optimizedSvg) {
    return optimizedSvg.data;
  }

  if ('modernError' in optimizedSvg) {
    console.log(optimizedSvg.modernError);
    throw new Error(`${name} is not valid svg`);
  }

  return content;
}
