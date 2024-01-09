import React, { useCallback } from 'react';
import { feedImages } from '@cbhq/cds-common/internal/data/feedImages';

import { AnnouncementCard, AnnouncementCardProps } from '../../alpha/AnnouncementCard';
import { Carousel, CarouselId } from '../../alpha/carousel/Carousel';
import { Divider } from '../../layout/Divider';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';

export function CarouselItem({
  pictogram,
  spotSquare,
}: {
  pictogram?: AnnouncementCardProps['pictogram'];
  spotSquare?: AnnouncementCardProps['spotSquare'];
}) {
  const handleOnPress = useCallback(() => {
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      description="You can fit up to fifty two chararcters on 2 lines"
      onPress={handleOnPress}
      pictogram={pictogram}
      spotSquare={spotSquare}
      title="Title/Headline"
    />
  );
}

export function CarouselItemImage({ image }: { image: string }) {
  const handleOnPress = useCallback(() => {
    console.log('pressed card');
  }, []);

  return (
    <AnnouncementCard
      description="You can fit up to fifty two chararcters on 2 lines"
      image={image}
      onPress={handleOnPress}
      title="Title/Headline"
    />
  );
}

export function ProgressBarsExample() {
  const onDismissItem = useCallback((id: CarouselId) => {
    console.log('onDismissItem', id);
  }, []);

  const onDismissLastItem = useCallback(() => {
    console.log('onDismissLastItem');
  }, []);

  return (
    <FeatureFlagProvider frontierButton frontierCard>
      <Carousel
        showDismiss
        showProgress
        dismissButtonAccessibilityLabel="Close"
        items={[
          <CarouselItem key="item1" spotSquare="sparkleToken" />,
          <CarouselItem key="item2" pictogram="addressBook" />,
          <CarouselItem key="item3" spotSquare="announcementAdvancedTrading" />,
          <CarouselItem key="item4" pictogram="worldwide" />,
        ]}
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
      />
      <Divider />
      <Carousel
        showDismiss
        showProgress
        dismissButtonAccessibilityLabel="Close"
        items={feedImages.map((item) => (
          <CarouselItemImage key={item} image={item} />
        ))}
        onDismissItem={onDismissItem}
        onDismissLastItem={onDismissLastItem}
      />
      <Divider />
    </FeatureFlagProvider>
  );
}
