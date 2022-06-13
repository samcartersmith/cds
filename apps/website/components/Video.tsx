/* eslint-disable jsx-a11y/media-has-caption */
import React, { useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { emptyObject } from '@cbhq/cds-utils';

type VideoOptions = {
  maxWidth?: string;
  maxHeight?: string;
};

export type VideoProps = {
  light?: string;
  dark?: string;
  src?: string;
  options?: VideoOptions;
};

const defaultOptions = {
  autoPlay: true,
  loop: true,
};

export const Video: React.FC<VideoProps> = ({ light, dark, src, options }) => {
  const srcFromSpectrum = useSpectrumConditional({ light, dark });
  const { maxWidth = '100%', maxHeight = '100%' } = options ?? (emptyObject as VideoOptions);
  const style = useMemo(() => ({ maxWidth, maxHeight }), [maxHeight, maxWidth]);

  const videoProps = useMemo(() => ({ ...defaultOptions, style }), [style]);

  if (light && dark) {
    return <video {...videoProps} src={srcFromSpectrum} />;
  }
  if (src) {
    return <video {...videoProps} src={src} />;
  }
  return <video {...videoProps} />;
};
