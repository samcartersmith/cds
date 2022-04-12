import { styled } from '@linaria/react';
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
  max-width: ${({ maxWidth }) => maxWidth ?? '100%'};
  max-height: ${({ maxHeight }) => maxHeight ?? '100%'};
`;

export const Image: React.FC<ImageProps> = ({ light, dark, src, options }) => {
  const spectrum = useSpectrumConditional({ light, dark });

  if (light && dark) {
    return <Img {...options} src={spectrum} />;
  }
  if (src) {
    return <Img {...options} src={src} />;
  }
  return <Img {...options} />;
};
