import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';

import { Image } from ':cds-website/components/Image';

type ImageOptions = {
  maxWidth?: string;
  maxHeight?: string;
};

export type ImageProps = {
  /* The img src must resolve to /website/static/img/components/<component>/<name> */
  component?: string;
  /* The img src must resolve to /website/static/img/components/<component>/<name> */
  name?: string;
  options?: ImageOptions;
  format?: 'jpg' | 'png';
};

export const DocImage: React.FC<ImageProps> = ({ component, name, options, format = 'jpg' }) => {
  const spectrumOpts = {
    light: `/img/components/${component}/${name}_light.${format}`,
    dark: `/img/components/${component}/${name}_dark.${format}`,
  };
  const src = useSpectrumConditional(spectrumOpts);

  return (
    <VStack spacingVertical={2}>
      <Box justifyContent="center" elevation={0} borderRadius="standard" overflow="hidden">
        <Image {...options} src={src} />
      </Box>
    </VStack>
  );
};
