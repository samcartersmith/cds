import React, { useCallback, useState } from 'react';

import { BoxBaseProps, ButtonBaseProps, ColorSurgeBaseProps, TextBaseProps } from '../types';

export type CreateColorSurgeProps = {
  VStack: React.ComponentType<BoxBaseProps & { gap: number }>;
  Box: React.ComponentType<BoxBaseProps & { overflow: string }>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  ColorSurge: React.ComponentType<ColorSurgeBaseProps>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
};

export function colorSurgeBuilder({
  VStack,
  Button,
  Box,
  ColorSurge: ColorSurgeComponent,
  TextBody,
}: CreateColorSurgeProps) {
  const ColorSurge = () => {
    const [num, setNum] = useState(0);

    const reRender = useCallback(() => {
      setNum((prevNum) => prevNum + 1);
    }, [setNum]);

    return (
      <VStack gap={3} key={num}>
        <Button compact onPress={reRender}>
          Re-render
        </Button>
        <Box spacing={3} borderRadius="rounded" overflow="hidden" position="relative" bordered>
          <ColorSurgeComponent />
          <TextBody as="p">Default</TextBody>
        </Box>
        <Box spacing={3} borderRadius="rounded" overflow="hidden" position="relative" bordered>
          <ColorSurgeComponent background="positive" />
          <TextBody as="p">Positive</TextBody>
        </Box>
        <Box spacing={3} borderRadius="rounded" overflow="hidden" position="relative" bordered>
          <ColorSurgeComponent background="negative" />
          <TextBody as="p">Negative</TextBody>
        </Box>
      </VStack>
    );
  };

  return {
    ColorSurge,
  };
}
