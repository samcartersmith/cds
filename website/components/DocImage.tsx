import { styled } from 'linaria/react';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

type ImageOptions = {
  maxWidth?: string;
  maxHeight?: string;
};

export type ImageProps = {
  /* The img src must resolve to /website/static/components/<component>/<name> */
  component?: string;
  /* The img src must resolve to /website/static/components/<component>/<name> */
  name?: string;
  options?: ImageOptions;
};

const Img = styled.img<ImageOptions>`
  max-width: ${({ maxWidth }) => maxWidth ?? '100%'};
  max-height: ${({ maxHeight }) => maxHeight ?? '100%'};
`;

export const DocImage: React.FC<ImageProps> = ({ component, name, options }) => {
  const spectrumOpts = {
    light: `/img/components/${component}/${name}_light.jpg`,
    dark: `/img/components/${component}/${name}_dark.jpg`,
  };
  const spectrum = useSpectrumConditional(spectrumOpts);

  return (
    <VStack spacingVertical={2}>
      <Box justifyContent="center" elevation={2} borderRadius="standard" overflow="hidden">
        <Img {...options} src={spectrum} />
      </Box>
    </VStack>
  );
};
