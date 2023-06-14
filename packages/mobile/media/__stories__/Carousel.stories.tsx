/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useIndexCounter } from '@cbhq/cds-common/hooks/useIndexCounter';
import { svgs } from '@cbhq/cds-common/internal/data/assets';

import { Button } from '../../buttons';
import { Card } from '../../cards';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { TextHeadline } from '../../typography/TextHeadline';
import { TextLabel1 } from '../../typography/TextLabel1';
import { Carousel } from '../Carousel/Carousel';
import { CarouselRef } from '../Carousel/types';
import { useCarousel } from '../Carousel/useCarousel';
import { useCarouselItem } from '../Carousel/useCarouselItem';
import { RemoteImage } from '../RemoteImage';

import { ProgressBarsExample } from './CarouselAlphaExample';

const ExampleCarouselItem = memo(({ svgId = 1 }: { svgId?: number }) => {
  const { dismiss } = useCarouselItem();
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
        source={svgs[svgId]}
      />
    </Card>
  );
});

const SimpleExample = () => {
  return (
    <Example title="Carousel">
      <Carousel
        items={[
          <ExampleCarouselItem key="item1" svgId={3} />,
          <ExampleCarouselItem key="item2" svgId={2} />,
          <ExampleCarouselItem key="item3" svgId={4} />,
          <ExampleCarouselItem key="item4" svgId={2} />,
          <ExampleCarouselItem key="item5" svgId={1} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
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
          <ExampleCarouselItem key="item1" svgId={4} />,
          <ExampleCarouselItem key="item2" svgId={3} />,
          <ExampleCarouselItem key="item3" svgId={2} />,
          <ExampleCarouselItem key="item4" svgId={5} />,
          <ExampleCarouselItem key="item5" svgId={2} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
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
          <ExampleCarouselItem key="item1" svgId={1} />,
          <ExampleCarouselItem key="item2" svgId={2} />,
          <ExampleCarouselItem key="item3" svgId={3} />,
          <ExampleCarouselItem key="item4" svgId={4} />,
          <ExampleCarouselItem key="item5" svgId={5} />,
          <ExampleCarouselItem key="item6" svgId={2} />,
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
    <SafeAreaProvider>
      <ExampleScreen>
        <ProgressBarsExample />
        <DynamicItemsExample />
        <SimpleExample />
        <UpdateOnMountExample />
        <TriggerViaButton />
      </ExampleScreen>
    </SafeAreaProvider>
  );
};

export default CarouselScreen;
ExampleCarouselItem.displayName = 'ExampleCarouselItem';
