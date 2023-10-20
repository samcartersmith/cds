import { useCallback, useRef } from 'react';
import { LottiePlayer } from '@cbhq/cds-common';
import { nux, NuxLottie } from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';
import { Button } from '@cbhq/cds-web/buttons';
import { HStack } from '@cbhq/cds-web/layout/HStack';

type LottieRef = LottiePlayer<NuxLottie>;

export const LottieExample = () => {
  const lottie = useRef<LottieRef>(null);

  // Play animation on click
  const play = useCallback(() => {
    lottie.current?.play();
  }, []);

  // onAnimationFinish will reset the lottie animation
  const onAnimationFinish = useCallback(() => {
    lottie.current?.reset();
  }, []);

  return (
    <HStack>
      <Button onPress={play}>Play</Button>
      <Lottie ref={lottie} height={500} onAnimationFinish={onAnimationFinish} source={nux} />
    </HStack>
  );
};
