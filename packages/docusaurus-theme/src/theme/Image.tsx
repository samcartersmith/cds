import React, { memo, useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { Box } from '@cbhq/cds-web/layout/Box';

export type ImageProps = {
  srcLight?: string;
  srcDark?: string;
  src?: string;
  maxWidth?: string;
  maxHeight?: string;
};

const Image = memo(function Image({
  src,
  srcLight = src,
  srcDark = src,
  maxWidth = '100%',
  maxHeight = '100%',
}: ImageProps) {
  const srcFromSpectrum = useSpectrumConditional({ light: srcLight, dark: srcDark });
  const style = useMemo(() => ({ maxWidth, maxHeight }), [maxHeight, maxWidth]);

  return (
    <VStack spacingVertical={2}>
      <Box justifyContent="center" elevation={0} borderRadius="rounded" overflow="hidden">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img style={style} src={srcFromSpectrum} />
      </Box>
    </VStack>
  );
});

Image.displayName = 'Image';
export default Image;
