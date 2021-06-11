import { cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';

import { Box } from '../../../layout';
import { TextBody } from '../../../typography';
import { Carousel } from '../Carousel';

describe('Carousel', () => {
  const itemSize = 200;
  const itemsLength = 3;
  const onReadySpy = jest.fn();

  const MockCarousel = () => {
    return (
      <Carousel onReady={onReadySpy}>
        {Array.from({ length: itemsLength }).map((_, index) => (
          <Box key={index} height={itemSize} width={itemSize}>
            <TextBody>CarouselItem</TextBody>
          </Box>
        ))}
      </Carousel>
    );
  };

  afterEach(cleanup);

  it('renders children', () => {
    const { queryAllByText } = render(<MockCarousel />);
    const items = queryAllByText('CarouselItem');
    expect(items).toHaveLength(itemsLength);
  });

  it('handles onReady', async () => {
    const { getByTestId } = render(<MockCarousel />);
    expect(onReadySpy).not.toHaveBeenCalled();
    await waitFor(() =>
      Promise.all([
        ...Array.from({ length: itemsLength }).map((_, i) =>
          fireEvent(getByTestId(`CarouselItemWrapper${i}`), 'onLayout', {
            nativeEvent: { layout: { x: itemSize * i } },
          })
        ),
        ...Array.from({ length: itemsLength }).map((_, i) =>
          fireEvent(getByTestId(`CarouselItemInner${i}`), 'onLayout', {
            nativeEvent: { layout: { width: itemSize } },
          })
        ),
      ])
    );
    expect(onReadySpy).toHaveBeenCalled();
  });

  it('does apply paddingRight if it is not the last item', () => {
    const { getByTestId } = render(<MockCarousel />);
    expect(getByTestId(`CarouselItemInner0`)).toHaveStyle({
      paddingRight: 24,
    });
  });

  it('does not apply paddingRight to the last item', () => {
    const { getByTestId } = render(<MockCarousel />);
    expect(getByTestId(`CarouselItemInner${itemsLength - 1}`)).toHaveStyle({
      paddingRight: 0,
    });
  });
});
