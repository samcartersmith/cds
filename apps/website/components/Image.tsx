import { useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { emptyObject } from '@cbhq/cds-utils';

type ImageOptions = {
  maxWidth?: string;
  maxHeight?: string;
};

export type ImageProps = {
  light?: string;
  dark?: string;
  src?: string;
  options?: ImageOptions;
};

export const Image: React.FC<ImageProps> = ({ light, dark, src, options }) => {
  const spectrum = useSpectrumConditional({ light, dark });
  const { maxWidth = '100%', maxHeight = '100%' } = options ?? (emptyObject as ImageOptions);
  const style = useMemo(() => ({ maxWidth, maxHeight }), [maxHeight, maxWidth]);

  if (light && dark) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img style={style} {...options} src={spectrum} />;
  }
  if (src) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img style={style} {...options} src={src} />;
  }
  return null;
};
