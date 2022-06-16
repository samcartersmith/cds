import React, { ReactNode, useCallback, useState } from 'react';

import { BoxBaseProps, ButtonBaseProps, ColorSurgeBaseProps, TextBaseProps } from '../types';

export type CreateHintMotionProps = {
  VStack: React.ComponentType<BoxBaseProps & { gap: number }>;
  Box: React.ComponentType<BoxBaseProps & { overflow?: string }>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
  ColorSurge: React.ComponentType<ColorSurgeBaseProps>;
  Shake: React.ComponentType;
};

export function hintMotionBuilder({
  VStack,
  Button,
  Box,
  ColorSurge: ColorSurgeComponent,
  Shake: ShakeComponent,
  TextBody,
}: CreateHintMotionProps) {
  const ReRenderer = ({ children }: { children: ReactNode }) => {
    const [num, setNum] = useState(0);

    const reRender = useCallback(() => {
      setNum((prevNum) => prevNum + 1);
    }, [setNum]);

    return (
      <VStack gap={3} key={num}>
        <Button compact onPress={reRender}>
          Re-render
        </Button>
        {children}
      </VStack>
    );
  };

  const ColorSurge = () => {
    return (
      <ReRenderer>
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
      </ReRenderer>
    );
  };

  const Shake = () => {
    return (
      <ReRenderer>
        <ShakeComponent>
          <Box spacing={3} borderRadius="rounded" bordered>
            <TextBody as="p">Shaking Box</TextBody>
          </Box>
        </ShakeComponent>
      </ReRenderer>
    );
  };

  return {
    ColorSurge,
    Shake,
  };
}
