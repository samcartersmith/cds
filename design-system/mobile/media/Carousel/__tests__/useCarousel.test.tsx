import { useCallback, useMemo } from 'react';

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { ScrollView } from 'react-native';

import { Button } from '../../../buttons';
import { Box } from '../../../layout';
import { Carousel } from '../Carousel';
import { useCarousel } from '../useCarousel';

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView');

describe('useCarousel', () => {
  afterEach(cleanup);

  const scrollToValue = 2;

  const MockCarousel = ({ length }: { length: number }) => {
    const carouselRef = useCarousel();
    const handleLogLength = useCallback(
      // eslint-disable-next-line no-console
      () => console.log(`Carousel length: ${carouselRef.current.length}`),
      [carouselRef],
    );
    const handleScrollTo = useCallback(
      () => carouselRef.current.scrollToId(scrollToValue),
      [carouselRef],
    );
    const handleScrollToEnd = useCallback(() => carouselRef.current.scrollToEnd(), [carouselRef]);
    const items = useMemo(
      () =>
        Array.from({ length }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`carousel-item-${i}`} height={200} width={200} />
        )),
      [length],
    );

    return (
      <>
        <Button testID="LogLength" onPress={handleLogLength} disableDebounce>
          Log Length
        </Button>
        <Button testID="ScrollTo" onPress={handleScrollTo}>
          Trigger ScrollTo
        </Button>
        <Button testID="ScrollToEnd" onPress={handleScrollToEnd}>
          Trigger ScrollToEnd
        </Button>
        <Carousel carouselRef={carouselRef} items={items} />
      </>
    );
  };

  it('exposes length of carousel items', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const { getByTestId, rerender } = render(<MockCarousel length={3} />);
    fireEvent.press(getByTestId('LogLength'));
    expect(spy).toHaveBeenCalledWith('Carousel length: 3');

    rerender(<MockCarousel length={4} />);

    fireEvent.press(getByTestId('LogLength'));
    expect(spy).toHaveBeenCalledWith('Carousel length: 4');
  });

  it('exposes scrollToId', async () => {
    const result = render(<MockCarousel length={3} />);
    fireEvent.press(result.getByTestId('ScrollTo'));
    expect(result.UNSAFE_getByType(ScrollView).instance.scrollTo).toHaveBeenCalled();
  });

  it('exposes scrollToEnd', async () => {
    const result = render(<MockCarousel length={3} />);
    fireEvent.press(result.getByTestId('ScrollToEnd'));
    expect(result.UNSAFE_getByType(ScrollView).instance.scrollToEnd).toHaveBeenCalled();
  });
});
