import React, { useCallback } from 'react';
import { IllustrationNames } from '@cbhq/cds-common';
import { feedImages } from '@cbhq/cds-common/internal/data/feedImages';
import { AnnouncementCard } from '../../alpha/AnnouncementCard';
import { Carousel, CarouselId } from '../../alpha/carousel/Carousel';
import { Divider } from '../../layout/Divider';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';

export function CarouselItem({ illustration }: { illustration: IllustrationNames }) {
  const handleOnPress = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      title="Title/Headline"
      description="You can fit up to fifty two chararcters on 2 lines"
      illustration={illustration}
      onPress={handleOnPress}
    />
  );
}

export function CarouselItemImage({ image }: { image: string }) {
  const handleOnPress = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      title="Title/Headline"
      description="You can fit up to fifty two chararcters on 2 lines"
      image={image}
      onPress={handleOnPress}
    />
  );
}

export function ProgressBarsExample() {
  const onDismissItem = useCallback((id: CarouselId) => {
    // eslint-disable-next-line no-console
    console.log('onDismissItem', id);
  }, []);

  const onDismissLastItem = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('onDismissLastItem');
  }, []);

  return (
    <FeatureFlagProvider frontierCard frontierButton>
      <Carousel
        showDismiss
        showProgress
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
        items={[
          <CarouselItem key="item1" illustration="selectReward" />,
          <CarouselItem key="item2" illustration="powerOfCrypto" />,
          <CarouselItem key="item3" illustration="sendingCrypto" />,
          <CarouselItem key="item4" illustration="worldwide" />,
        ]}
      />
      <Divider />
      <Carousel
        showDismiss
        showProgress
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
        items={feedImages.map((item) => (
          <CarouselItemImage key={item} image={item} />
        ))}
      />
      <Divider />
    </FeatureFlagProvider>
  );
}
