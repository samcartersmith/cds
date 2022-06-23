import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';

import { Image } from ':cds-website/components/Image';

type ImageOptions = {
  maxWidth?: string;
  maxHeight?: string;
};

export type ImageProps = {
  /**
   * @default components
   * The img src must resolve to /website/static/img/<category>/<component>/<name>
   */
  category?: string;
  /* The img src must resolve to /website/static/img/components/<component>/<name> */
  component?: string;
  /* The img src must resolve to /website/static/img/components/<component>/<name> */
  name?: string;
  options?: ImageOptions;
  format?: 'jpg' | 'png' | 'gif';
};

export const DocImage: React.FC<ImageProps> = ({
  category = 'components',
  component,
  name,
  options,
  format = 'jpg',
}) => {
  const spectrumOpts = {
    light: `/img/${category}/${component}/${name}_light.${format}`,
    dark: `/img/${category}/${component}/${name}_dark.${format}`,
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
