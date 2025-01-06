import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { HStack } from '../../layout/HStack';
import { TextTitle1, TextTitle2 } from '../../typography';
import { debounce } from '../../utils/debounce';
import { Button } from '../Button';

jest.mock('@cbhq/cds-common2/system/useEventHandler');
jest.mock('../../utils/debounce');

describe('Button', () => {
  it('passes a11y', () => {
    render(<Button testID="mock-btn">Child</Button>);
    expect(screen.getByTestId('mock-btn')).toBeAccessible();
  });

  it('renders an animated view', () => {
    render(<Button>Child</Button>);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(<Button>Child</Button>);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children text', () => {
    render(<Button>Child</Button>);

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    render(<Button onPress={spy}>Child</Button>);

    fireEvent.press(screen.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });

  it('Wraps children with a text component when using a string as children', () => {
    render(<Button>Child</Button>);

    expect(screen.getByTestId('text-headline')).not.toBeNull();
  });

  it('Does not wrap children with a text component when using a ReactNode as children', () => {
    render(
      <Button>
        <HStack gap={1}>
          <TextTitle1>Title</TextTitle1>
          <TextTitle2>Subtitle</TextTitle2>
        </HStack>
      </Button>,
    );

    expect(screen.queryByTestId('text-headline')).toBeNull();
  });

  it('renders a button with a ReactNode as endIcon', () => {
    const CustomIcon = () => (
      <Box testID="custom-react-node">
        <TextTitle1>Custom Icon</TextTitle1>
      </Box>
    );
    render(
      <Button end={<CustomIcon />}>
        <TextTitle1>Child</TextTitle1>
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(screen.getByTestId('custom-react-node')).not.toBeNull();
  });
});
