import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ScrollSnapCarouselProps } from '@theme/ScrollSnapCarousel';
import { debounce } from 'lodash';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { IconButton } from '@cbhq/cds-web/buttons';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';

const SCROLL_OPTIONS: ScrollOptions = { behavior: 'smooth' };
const SCROLL_DEBOUNCE_DELAY = 100;

// TODO: persist card dismissal state beyond component lifetime
const ScrollSnapCarousel = memo(function ScrollSnapCarousel({
  cards,
  renderCards,
  loading,
  dismissableCards,
  spacingHorizontal = gutter,
  spacingVertical = 3,
  ...props
}: ScrollSnapCarouselProps) {
  const [currentCards, setCurrentCards] = useState<unknown[]>([]);
  const [backArrowDisabled, setBackArrowDisabled] = useState(true);
  const [forwardArrowDisabled, setForwardArrowDisabled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getCurrentCardIndex = () => {
    const firstCard = carouselRef.current?.firstElementChild;

    if (!firstCard) {
      return 0;
    }

    const firstCardMargin = parseInt(getComputedStyle(firstCard).getPropertyValue('margin-right'));
    return Math.round(carouselRef.current.scrollLeft / (firstCard.clientWidth + firstCardMargin));
  };

  const updateArrowState = useCallback(() => {
    if (carouselRef.current?.scrollLeft === 0) {
      setBackArrowDisabled(true);
    } else {
      setBackArrowDisabled(false);
    }

    if (getCurrentCardIndex() + 1 === currentCards.length) {
      setForwardArrowDisabled(true);
    } else {
      setForwardArrowDisabled(false);
    }
  }, [currentCards.length]);

  const debouncedScrollCb = debounce(() => updateArrowState(), SCROLL_DEBOUNCE_DELAY);

  const handleScroll = useCallback(() => debouncedScrollCb(), [debouncedScrollCb]);

  const handleBackPress = useCallback(
    () =>
      carouselRef.current?.scrollBy({ ...SCROLL_OPTIONS, left: -carouselRef.current.clientWidth }),
    [],
  );

  const handleForwardPress = useCallback(
    () =>
      carouselRef.current?.scrollBy({ ...SCROLL_OPTIONS, left: carouselRef.current.clientWidth }),
    [],
  );

  const handleClosePress = useCallback(() => {
    setCurrentCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.splice(getCurrentCardIndex(), 1);
      return newCards;
    });
    updateArrowState();
  }, [updateArrowState]);

  useEffect(() => {
    if (cards?.length) {
      setCurrentCards(cards);
    }
  }, [cards]);

  useEffect(() => {
    updateArrowState();
  }, [updateArrowState]);

  useEffect(() => debouncedScrollCb.cancel(), [debouncedScrollCb]);

  if (loading) {
    return (
      <Box justifyContent="center" spacing={6}>
        <Spinner size={4} />
      </Box>
    );
  }

  if (!currentCards.length) {
    return null;
  }

  return (
    <VStack
      spacingHorizontal={spacingHorizontal}
      spacingVertical={currentCards.length === 1 ? 6 : spacingVertical}
      {...props}
    >
      {(currentCards.length > 1 || dismissableCards) && (
        <HStack
          justifyContent={
            currentCards.length === 1 && dismissableCards ? 'flex-end' : 'space-between'
          }
          offsetHorizontal={1}
          offsetTop={1}
          spacingBottom={1}
        >
          {currentCards.length > 1 && (
            <HStack gap={1}>
              <IconButton
                transparent
                disabled={backArrowDisabled}
                name="backArrow"
                onPress={handleBackPress}
              />
              <IconButton
                transparent
                disabled={forwardArrowDisabled}
                name="forwardArrow"
                onPress={handleForwardPress}
              />
            </HStack>
          )}
          {dismissableCards && <IconButton transparent name="close" onPress={handleClosePress} />}
        </HStack>
      )}
      <HStack
        ref={carouselRef}
        dangerouslySetClassName="scroll-snap-carousel"
        onScroll={handleScroll}
        overflow="scroll"
      >
        {renderCards(currentCards)}
      </HStack>
    </VStack>
  );
});

export default ScrollSnapCarousel;
