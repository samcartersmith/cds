import React, { useCallback, useRef } from 'react';

import {
  BoxBaseProps,
  ButtonBaseProps,
  ColorSurgeBaseProps,
  ColorSurgeRefBaseProps,
  ForwardedRef,
  PulseBaseProps,
  PulseRefBaseProps,
  ShakeBaseProps,
  ShakeRefBaseProps,
  TextBaseProps,
} from '../types';

export type CreateHintMotionProps = {
  VStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & { gap?: number }>>;
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps & { overflow?: string }>>;
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps & { onPress?: () => void }>>;
  TextBody: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  ColorSurge: React.ComponentType<
    React.PropsWithChildren<ColorSurgeBaseProps & { ref: ForwardedRef<ColorSurgeRefBaseProps> }>
  >;
  Shake: React.ComponentType<
    React.PropsWithChildren<ShakeBaseProps & { ref: ForwardedRef<ShakeRefBaseProps> }>
  >;
  Pulse: React.ComponentType<
    React.PropsWithChildren<PulseBaseProps & { ref: ForwardedRef<PulseRefBaseProps> }>
  >;
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
  const ColorSurge = () => {
    const ref = useRef<ColorSurgeRefBaseProps>(null);

    const handleSurgePrimary = useCallback(async () => ref.current?.play('primary'), []);
    const handleSurgePositive = useCallback(async () => ref.current?.play('positive'), []);
    const handleSurgeNegative = useCallback(async () => ref.current?.play('negative'), []);

    return (
      <VStack gap={3}>
        <Box spacing={3} borderRadius="rounded" overflow="hidden" position="relative" bordered>
          <ColorSurgeComponent ref={ref} disableAnimateOnMount />
          <TextBody as="p">Color Surge</TextBody>
        </Box>
        <Button onPress={handleSurgePrimary}>Surge - Primary</Button>
        <Button onPress={handleSurgePositive}>Surge - Positive</Button>
        <Button onPress={handleSurgeNegative}>Surge - Negative</Button>
      </VStack>
    );
  };

  const Shake = () => {
    const ref = useRef<ShakeRefBaseProps>(null);

    const handleShake = useCallback(async () => ref.current?.play(), []);

    return (
      <VStack gap={3}>
        <ShakeComponent ref={ref} disableAnimateOnMount>
          <Box spacing={3} borderRadius="rounded" bordered>
            <TextBody as="p">Shaking Box</TextBody>
          </Box>
        </ShakeComponent>
        <Button onPress={handleShake}>Shake</Button>
      </VStack>
    );
  };

  const Pulse = () => {
    const ref = useRef<PulseRefBaseProps>(null);

    const handlePulseHeavy = useCallback(async () => ref.current?.play('heavy'), []);
    const handlePulseModerate = useCallback(async () => ref.current?.play('moderate'), []);
    const handlePulseSubtle = useCallback(async () => ref.current?.play('subtle'), []);
    const handleStop = useCallback(() => ref.current?.stop(), []);

    return (
      <VStack gap={3}>
        <PulseComponent variant="heavy" ref={ref} disableAnimateOnMount>
          <Box width={50} height={50} background="primary" />
          <Box width={50} height={50} background="negative" />
          <Box width={50} height={50} background="positive" />
        </PulseComponent>
        <Button onPress={handlePulseHeavy}>Pulse - Heavy</Button>
        <Button onPress={handlePulseModerate}>Pulse - Moderate</Button>
        <Button onPress={handlePulseSubtle}>Pulse - Subtle</Button>
        <Button onPress={handleStop}>Stop</Button>
      </VStack>
    );
  };

  return {
    ColorSurge,
    Shake,
    Pulse,
  };
}
