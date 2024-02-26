import React, { memo, useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { SpacingScale } from '@cbhq/cds-web';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';

export type ImageProps = {
  srcLight?: string;
  srcDark?: string;
  src?: string;
  maxWidth?: string;
  maxHeight?: string;
  spacingVertical?: SpacingScale;
};

const Image = memo(function Image({
  src,
  srcLight = src,
  srcDark = src,
  maxWidth = '100%',
  maxHeight = '100%',
  spacingVertical = 2,
}: ImageProps) {
  const srcFromSpectrum = useSpectrumConditional({ light: srcLight, dark: srcDark });
  const style = useMemo(() => ({ maxWidth, maxHeight }), [maxHeight, maxWidth]);

  return (
    <VStack spacingVertical={spacingVertical}>
      <Box borderRadius="rounded" elevation={0} justifyContent="center" overflow="hidden">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={srcFromSpectrum} style={style} />
      </Box>
    </VStack>
  );
});

Image.displayName = 'Image';
export default Image;
