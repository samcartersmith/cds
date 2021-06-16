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
    const { id } = useCarouselItem();
    return (
      <Box height={200} width={200}>
        <TextBody>{id}</TextBody>
      </Box>
    );
  };

  const MockCarousel = () => {
    const items = Array.from({ length: 4 }).map((_, i) => (
      <MockCarouselItem key={`carousel-item-${i}`} />
    ));

    return <Carousel items={items} />;
  };

  it('logs an error if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useCarouselItem());
    expect(spy).toHaveBeenCalledWith(
      'useCarouselItem: Cannot use `useCarouselItem` outside of Carousel component.'
    );
    spy.mockRestore();
  });

  it('returns an id value of -1 if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useCarouselItem());
    expect(result.current.id).toEqual('-1');
    spy.mockRestore();
  });

  it('returns an object with dismiss and id', () => {
    const dismissSpy = jest.fn();
    const Wrapper: React.FC = ({ children }) => (
      <CarouselItemContext.Provider value={{ id: 'item1', dismiss: dismissSpy }}>
        {children}
      </CarouselItemContext.Provider>
    );
    const { result } = renderHook(() => useCarouselItem(), { wrapper: Wrapper });
    expect(result.current).toEqual({ id: 'item1', dismiss: dismissSpy });
  });

  it('returns the correct id', () => {
    const { queryByText } = render(<MockCarousel />);
    expect(queryByText('carousel-item-0')).not.toBeNull();
    expect(queryByText('carousel-item-1')).not.toBeNull();
    expect(queryByText('carousel-item-2')).not.toBeNull();
    expect(queryByText('carousel-item-3')).not.toBeNull();
  });

  it('handles dismiss', () => {
    const dismissSpy = jest.fn();
    const ChildWithPressable = () => {
      const { dismiss } = useCarouselItem();
      const handleDismiss = () => dismiss();
      return (
        <Button testID="DismissButton" onPress={handleDismiss}>
          Dismiss
        </Button>
      );
    };
    const result = render(
      <CarouselItemContext.Provider value={{ id: 'item1', dismiss: dismissSpy }}>
        <ChildWithPressable />
      </CarouselItemContext.Provider>
    );
    fireEvent.press(result.getByTestId('DismissButton'));
    expect(dismissSpy).toHaveBeenCalled();
  });
});
