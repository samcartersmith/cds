/* eslint-disable jsx-a11y/media-has-caption */
import React, { memo, useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

export type VideoProps = {
  srcLight?: string;
  srcDark?: string;
  src?: string;
  maxWidth?: string;
  maxHeight?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

const Video = memo(function Video({
  src,
  srcLight = src,
  srcDark = src,
  maxWidth = '100%',
  maxHeight = '100%',
  autoPlay = true,
  loop = true,
  controls = false,
}: VideoProps) {
  const srcFromSpectrum = useSpectrumConditional({ light: srcLight, dark: srcDark });

  const style = useMemo(() => ({ maxWidth, maxHeight }), [maxHeight, maxWidth]);
  return (
    <video
      src={srcFromSpectrum}
      autoPlay={autoPlay}
      loop={loop}
      controls={controls}
      style={style}
    />
  );
});

Video.displayName = 'Video';

export default Video;
