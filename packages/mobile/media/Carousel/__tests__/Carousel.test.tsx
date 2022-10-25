import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Box } from '../../../layout';
import { TextBody } from '../../../typography';
import { Carousel } from '../Carousel';

describe('Carousel', () => {
  const itemSize = 200;
  const itemsLength = 3;
  const onReadySpy = jest.fn();

  const MockCarousel = () => {
    const items = Array.from({ length: itemsLength }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box key={`item${index}`} height={itemSize} width={itemSize}>
        <TextBody>CarouselItem</TextBody>
      </Box>
    ));
    return <Carousel items={items} onReady={onReadySpy} />;
  };

  afterEach(cleanup);

  it('renders children', () => {
    render(<MockCarousel />);
    const items = screen.queryAllByText('CarouselItem');
    expect(items).toHaveLength(itemsLength);
  });

  it('handles onReady', async () => {
    render(<MockCarousel />);
    expect(onReadySpy).not.toHaveBeenCalled();
    await waitFor(async () =>
      Promise.all([
        ...Array.from({ length: itemsLength }).map(async (_, i) => {
          fireEvent(screen.getByTestId(`CarouselItemWrapper-item${i}`), 'onLayout', {
            nativeEvent: { layout: { x: itemSize * i } },
          });
        }),
        ...Array.from({ length: itemsLength }).map(async (_, i) => {
          fireEvent(screen.getByTestId(`CarouselItemInner-item${i}`), 'onLayout', {
            nativeEvent: { layout: { width: itemSize } },
          });
        }),
      ]),
    );
    expect(onReadySpy).toHaveBeenCalled();
  });

  it('does apply paddingRight if it is not the last item', () => {
    render(<MockCarousel />);
    expect(screen.getByTestId(`CarouselItemInner-item0`)).toHaveStyle({
      paddingRight: 24,
    });
  });

  it('does not apply paddingRight to the last item', () => {
    render(<MockCarousel />);
    expect(screen.getByTestId(`CarouselItemInner-item${itemsLength - 1}`)).toHaveStyle({
      paddingRight: 0,
    });
  });
});
