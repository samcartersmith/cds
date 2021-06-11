import { renderHook } from '@testing-library/react-hooks';
import { cleanup, fireEvent, render } from '@testing-library/react-native';

import { Button } from '../../../buttons';
import { Box } from '../../../layout';
import { TextBody } from '../../../typography';
import { Carousel } from '../Carousel';
import { CarouselItemContext } from '../CarouselItemContext';
import { useCarouselItem } from '../useCarouselItem';

describe('useCarouselItem', () => {
  afterEach(cleanup);

  const MockCarouselItem = () => {
    const { index } = useCarouselItem();
    return (
      <Box height={200} width={200}>
        <TextBody>{`Index ${index}`}</TextBody>
      </Box>
    );
  };

  const MockCarousel = () => {
    return (
      <Carousel>
        {Array.from({ length: 4 }).map((_, i) => (
          <MockCarouselItem key={`carousel-item-${i}`} />
        ))}
      </Carousel>
    );
  };

  it('logs an error if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useCarouselItem());
    expect(spy).toHaveBeenCalledWith(
      'useCarouselItem: Cannot use `useCarouselItem` outside of Carousel component.'
    );
    spy.mockRestore();
  });

  it('returns an index value of -1 if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useCarouselItem());
    expect(result.current.index).toEqual(-1);
    spy.mockRestore();
  });

  it('returns an object with dismiss and index', () => {
    const dismissSpy = jest.fn();
    const Wrapper: React.FC = ({ children }) => (
      <CarouselItemContext.Provider value={{ index: 1, dismiss: dismissSpy }}>
        {children}
      </CarouselItemContext.Provider>
    );
    const { result } = renderHook(() => useCarouselItem(), { wrapper: Wrapper });
    expect(result.current).toEqual({ index: 1, dismiss: dismissSpy });
  });

  it('returns the correct index', () => {
    const { queryByText } = render(<MockCarousel />);
    expect(queryByText('Index 0')).not.toBeNull();
    expect(queryByText('Index 1')).not.toBeNull();
    expect(queryByText('Index 2')).not.toBeNull();
    expect(queryByText('Index 3')).not.toBeNull();
  });

  it('handles dismiss', () => {
    const dismissSpy = jest.fn();
    const ChildWithPressable = () => {
      const { dismiss } = useCarouselItem();
      return (
        <Button testID={`DismissButton`} onPress={dismiss}>
          Dismiss
        </Button>
      );
    };
    const result = render(
      <CarouselItemContext.Provider value={{ index: 1, dismiss: dismissSpy }}>
        <ChildWithPressable />
      </CarouselItemContext.Provider>
    );
    fireEvent.press(result.getByTestId('DismissButton'));
    expect(dismissSpy).toHaveBeenCalled();
  });
});
