import React, { useMemo } from 'react';
import { styled } from '@linaria/react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

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

const Vid = styled.video<VideoOptions>`
  max-width: ${({ maxWidth }) => maxWidth ?? '100%'};
  max-height: ${({ maxHeight }) => maxHeight ?? '100%'};
`;

const defaultOptions = {
  autoPlay: true,
  loop: true,
};

export const Video: React.FC<VideoProps> = ({ light, dark, src, options: optionsProps }) => {
  const srcFromSpectrum = useSpectrumConditional({ light, dark });

  const options = useMemo(() => ({ ...defaultOptions, ...optionsProps }), [optionsProps]);

  if (light && dark) {
    return <Vid {...options} src={srcFromSpectrum} />;
  }
  if (src) {
    return <Vid {...options} src={src} />;
  }
  return <Vid {...options} />;
};
