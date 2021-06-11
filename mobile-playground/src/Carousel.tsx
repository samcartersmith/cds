import React, { memo, useCallback } from 'react';

import { Button } from '@cbhq/cds-mobile/buttons';
import { Card } from '@cbhq/cds-mobile/layout';
import {
  Carousel,
  CarouselRef,
  RemoteImage,
  useCarousel,
  useCarouselItem,
} from '@cbhq/cds-mobile/media';
import { TextHeadline, TextLabel1 } from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const ExampleCarouselItem = memo(() => {
  const { dismiss, index } = useCarouselItem();
  return (
    <Card spacing={2} onPress={() => dismiss()}>
      <TextLabel1 ellipsize="tail">Label</TextLabel1>
      <TextHeadline color="foregroundMuted" numberOfLines={2} ellipsize="tail" spacingBottom={0.5}>
        Title
      </TextHeadline>
      <RemoteImage
        shape="squircle"
        width={120}
        height={120}
        resizeMode="cover"
        source={{ uri: `https://source.unsplash.com/120x120?bitcoin${index}` }}
      />
    </Card>
  );
});

const SimpleExample = () => {
  return (
    <Example title="Carousel">
      <Carousel>
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
      </Carousel>
    </Example>
  );
};

const UpdateOnMountExample = () => {
  const handleOnReady = useCallback(({ scrollToIndex }: CarouselRef) => {
    scrollToIndex(3, { animated: false });
  }, []);

  return (
    <Example title="Carousel - snap to index on mount">
      <Carousel onReady={handleOnReady}>
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
      </Carousel>
    </Example>
  );
};

const TriggerViaButton = () => {
  const carousel = useCarousel();
  const triggerScrollTo = useCallback(() => {
    carousel.current.scrollToIndex(2);
  }, [carousel]);

  return (
    <Example title="Carousel - trigger scrollTo via button">
      <Button onPress={triggerScrollTo}>Test scrollTo</Button>
      <Carousel carouselRef={carousel}>
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
        <ExampleCarouselItem />
      </Carousel>
    </Example>
  );
};

const CarouselScreen = () => {
  return (
    <ExamplesScreen>
      <SimpleExample />
      <UpdateOnMountExample />
      <TriggerViaButton />
    </ExamplesScreen>
  );
};

export default CarouselScreen;
ExampleCarouselItem.displayName = 'ExampleCarouselItem';
