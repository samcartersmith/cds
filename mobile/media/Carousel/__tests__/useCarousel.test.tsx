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
    const handleLogLength = () => console.log(`Carousel length: ${carouselRef.current.length}`);
    const handleScrollTo = () => carouselRef.current.scrollToIndex(scrollToValue);
    return (
      <>
        <Button testID="LogLength" onPress={handleLogLength}>
          Log Length
        </Button>
        <Button testID="ScrollTo" onPress={handleScrollTo}>
          Trigger ScrollTo
        </Button>
        <Carousel carouselRef={carouselRef}>
          {Array.from({ length }).map((_, i) => (
            <Box key={`carousel-item-${i}`} height={200} width={200} />
          ))}
        </Carousel>
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

  it('exposes scrollToIndex', async () => {
    const result = render(<MockCarousel length={3} />);
    fireEvent.press(result.getByTestId('ScrollTo'));
    expect(result.UNSAFE_getByType(ScrollView).instance.scrollTo).toHaveBeenCalled();
  });
});
