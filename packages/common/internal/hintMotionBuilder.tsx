import React, { ReactNode, useCallback, useState } from 'react';

import {
  BoxBaseProps,
  ButtonBaseProps,
  ColorSurgeBaseProps,
  PulseBaseProps,
  TextBaseProps,
} from '../types';

export type CreateHintMotionProps = {
  VStack: React.ComponentType<BoxBaseProps & { gap?: number }>;
  Box: React.ComponentType<BoxBaseProps & { overflow?: string }>;
  Button: React.ComponentType<ButtonBaseProps & { onPress?: () => void }>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
  ColorSurge: React.ComponentType<ColorSurgeBaseProps>;
  Shake: React.ComponentType;
  Pulse: React.ComponentType<PulseBaseProps>;
};

export function hintMotionBuilder({
  VStack,
  Button,
  Box,
  ColorSurge: ColorSurgeComponent,
  Shake: ShakeComponent,
  Pulse: PulseComponent,
  TextBody,
}: CreateHintMotionProps) {
  const Rerenderer = ({ children }: { children: ReactNode }) => {
    const [num, setNum] = useState(0);

    const rerender = useCallback(() => {
      setNum((prevNum) => prevNum + 1);
    }, [setNum]);

    return (
      <VStack gap={3} key={num}>
        <Button compact onPress={rerender}>
          Re-render
        </Button>
        {children}
      </VStack>
    );
  };

  const ColorSurge = () => {
    return (
      <Rerenderer>
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
      </Rerenderer>
    );
  };

  const Shake = () => {
    return (
      <Rerenderer>
        <ShakeComponent>
          <Box spacing={3} borderRadius="rounded" bordered>
            <TextBody as="p">Shaking Box</TextBody>
          </Box>
        </ShakeComponent>
      </Rerenderer>
    );
  };

  const Pulse = () => {
    return (
      <VStack>
        <PulseComponent variant="subtle">
          <TextBody as="p">Subtle</TextBody>
          <Box width={50} height={50} background="primary" />
          <Box width={50} height={50} background="negative" />
          <Box width={50} height={50} background="positive" />
        </PulseComponent>
        <PulseComponent>
          <TextBody as="p">Moderate</TextBody>
          <Box width={50} height={50} background="primary" />
          <Box width={50} height={50} background="negative" />
          <Box width={50} height={50} background="positive" />
        </PulseComponent>
        <PulseComponent variant="heavy">
          <TextBody as="p">Heavy</TextBody>
          <Box width={50} height={50} background="primary" />
          <Box width={50} height={50} background="negative" />
          <Box width={50} height={50} background="positive" />
        </PulseComponent>
      </VStack>
    );
  };

  return {
    ColorSurge,
    Shake,
    Pulse,
  };
}
