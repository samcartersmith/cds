import { optimize } from 'svgo';

import svgoConfig from './svgoConfig';

export function optimizeSvg(content: string): string {
  const optimizedSvg = optimize(content, svgoConfig);
  return optimizedSvg.data.replaceAll('#0A0B0D', '#1652F0');
}
