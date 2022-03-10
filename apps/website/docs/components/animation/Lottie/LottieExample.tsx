import { useCallback, useRef } from 'react';

import { LottiePlayer } from '@cbhq/cds-common';
import { nux, NuxLottie } from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-web/animation/Lottie';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { Button } from '@cbhq/cds-web/buttons';

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
      <Lottie ref={lottie} source={nux} height={500} onAnimationFinish={onAnimationFinish} />
    </HStack>
  );
};
