/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useIndexCounter } from '@cbhq/cds-common/hooks/useIndexCounter';

import { Button } from '../../buttons';
import { Card, HStack } from '../../layout';
import { Carousel } from '../Carousel/Carousel';
import { CarouselRef } from '../Carousel/types';
import { useCarousel } from '../Carousel/useCarousel';
import { useCarouselItem } from '../Carousel/useCarouselItem';
import { RemoteImage } from '../RemoteImage';
import { TextHeadline } from '../../typography/TextHeadline';
import { TextLabel1 } from '../../typography/TextLabel1';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const ExampleCarouselItem = memo(() => {
  const { dismiss, id } = useCarouselItem();
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
        source={{ uri: `https://source.unsplash.com/120x120?bitcoin-${id}` }}
      />
    </Card>
  );
});

const SimpleExample = () => {
  return (
    <Example title="Carousel">
      <Carousel
        items={[
          <ExampleCarouselItem key="item1" />,
          <ExampleCarouselItem key="item2" />,
          <ExampleCarouselItem key="item3" />,
          <ExampleCarouselItem key="item4" />,
          <ExampleCarouselItem key="item5" />,
          <ExampleCarouselItem key="item6" />,
        ]}
      />
    </Example>
  );
};

const UpdateOnMountExample = () => {
  const handleOnReady = useCallback(({ scrollToId }: CarouselRef) => {
    scrollToId('item3', { animated: false });
  }, []);

  return (
    <Example title="Carousel - snap to index on mount">
      <Carousel
        onReady={handleOnReady}
        items={[
          <ExampleCarouselItem key="item1" />,
          <ExampleCarouselItem key="item2" />,
          <ExampleCarouselItem key="item3" />,
          <ExampleCarouselItem key="item4" />,
          <ExampleCarouselItem key="item5" />,
          <ExampleCarouselItem key="item6" />,
        ]}
      />
    </Example>
  );
};

const TriggerViaButton = () => {
  const carousel = useCarousel();
  const triggerScrollTo = useCallback(() => {
    carousel.current.scrollToId('item3');
  }, [carousel]);

  return (
    <Example title="Carousel - trigger scrollTo via button">
      <Button onPress={triggerScrollTo}>Test scrollTo</Button>
      <Carousel
        carouselRef={carousel}
        items={[
          <ExampleCarouselItem key="item1" />,
          <ExampleCarouselItem key="item2" />,
          <ExampleCarouselItem key="item3" />,
          <ExampleCarouselItem key="item4" />,
          <ExampleCarouselItem key="item5" />,
          <ExampleCarouselItem key="item6" />,
        ]}
      />
    </Example>
  );
};

const DynamicItemsExample = () => {
  const carousel = useCarousel();
  const triggerScrollToEnd = useRef(false);

  const onIncrement = useCallback(() => {
    triggerScrollToEnd.current = true;
  }, []);

  const { activeIndex: itemsLength, handleIncrement } = useIndexCounter({
    length: 100,
    startIndex: 4,
    onIncrement,
  });

  const handleScrollToEnd = useCallback(() => {
    carousel.current.scrollToEnd();
  }, [carousel]);

  const onContentSizeChange = useCallback(() => {
    if (triggerScrollToEnd.current) {
      handleScrollToEnd();
      triggerScrollToEnd.current = false;
    }
  }, [handleScrollToEnd]);

  const items = useMemo(() => {
    return Array.from({ length: itemsLength }).map((_, index) => {
      // eslint-disable-next-line react/no-array-index-key
      return <ExampleCarouselItem key={`add-item-example-${index}`} />;
    });
  }, [itemsLength]);

  return (
    <Example title="Carousel - dynamic items">
      <HStack alignItems="flex-start" gap={2} spacingBottom={2}>
        <Button compact onPress={handleIncrement}>
          Add item
        </Button>
        <Button compact onPress={handleScrollToEnd}>
          Scroll to end
        </Button>
      </HStack>
      <Carousel carouselRef={carousel} items={items} onContentSizeChange={onContentSizeChange} />
    </Example>
  );
};

const CarouselScreen = () => {
  return (
    <ExampleScreen>
      <DynamicItemsExample />
      <SimpleExample />
      <UpdateOnMountExample />
      <TriggerViaButton />
    </ExampleScreen>
  );
};

export default CarouselScreen;
ExampleCarouselItem.displayName = 'ExampleCarouselItem';
