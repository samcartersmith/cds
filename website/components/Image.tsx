import { styled } from 'linaria/react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

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

const Img = styled.img<ImageOptions>`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '100%')};
`;

export const Image: React.FC<ImageProps> = ({ light, dark, src, options }) => {
  if (light && dark) {
    return <Img {...options} src={useSpectrumConditional({ light: light, dark: dark })} />;
  } else if (src) {
    return <Img {...options} src={src} />;
  } else {
    return <Img {...options} />;
  }
};
