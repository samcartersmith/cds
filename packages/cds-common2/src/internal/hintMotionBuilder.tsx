import React, { useCallback, useMemo, useRef } from 'react';

import {
  BoxBaseProps,
  ButtonBaseProps,
  ColorSurgeBaseProps,
  ColorSurgeRefBaseProps,
  ForwardedRef,
  MotionTransition,
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

    const handleSurgePrimary = useCallback(async () => ref.current?.play('backgroundPrimary'), []);
    const handleSurgePositive = useCallback(
      async () => ref.current?.play('backgroundPositive'),
      [],
    );
    const handleSurgeNegative = useCallback(
      async () => ref.current?.play('backgroundNegative'),
      [],
    );

    return (
      <VStack gap={3}>
        <Box bordered borderRadius={200} overflow="hidden" padding={3} position="relative">
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
          <Box bordered borderRadius={200} padding={3}>
            <TextBody as="p">Shaking Box</TextBody>
          </Box>
        </ShakeComponent>
        <Button onPress={handleShake}>Shake</Button>
      </VStack>
    );
  };

  const Pulse = () => {
    const ref = useRef<PulseRefBaseProps>(null);
    const customRef = useRef<PulseRefBaseProps>(null);
    const handlePulseHeavy = useCallback(async () => ref.current?.play('heavy'), []);
    const handlePulseModerate = useCallback(async () => ref.current?.play('moderate'), []);
    const handlePulseSubtle = useCallback(async () => ref.current?.play('subtle'), []);
    const handleStop = useCallback(() => ref.current?.stop(), []);

    const customTransition: MotionTransition = useMemo(
      () => ({ oneOffDuration: 1000, easing: 'global' }),
      [],
    );
    const handleCustom = useCallback(async () => customRef.current?.play(), []);
    const handleCustomStop = useCallback(() => customRef.current?.stop(), []);

    return (
      <VStack gap={3}>
        <PulseComponent ref={ref} disableAnimateOnMount variant="heavy">
          <Box background="backgroundPrimary" height={50} width={50} />
          <Box background="backgroundNegative" height={50} width={50} />
          <Box background="backgroundPositive" height={50} width={50} />
        </PulseComponent>
        <Button onPress={handlePulseHeavy}>Pulse - Heavy</Button>
        <Button onPress={handlePulseModerate}>Pulse - Moderate</Button>
        <Button onPress={handlePulseSubtle}>Pulse - Subtle</Button>
        <Button onPress={handleStop}>Stop</Button>
        <TextBody as="p">Custom Transition</TextBody>
        <PulseComponent ref={customRef} disableAnimateOnMount motionConfig={customTransition}>
          <Box background="backgroundPrimary" height={50} width={50} />
          <Box background="backgroundNegative" height={50} width={50} />
          <Box background="backgroundPositive" height={50} width={50} />
        </PulseComponent>
        <Button onPress={handleCustom}>Pulse - Custom</Button>
        <Button onPress={handleCustomStop}>Stop</Button>
      </VStack>
    );
  };

  return {
    ColorSurge,
    Shake,
    Pulse,
  };
}
