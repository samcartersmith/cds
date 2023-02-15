import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';

import { debounce } from '../../utils/debounce';
import { Button } from '../Button';

jest.mock('@cbhq/cds-common/system/useEventHandler');
jest.mock('../../utils/debounce');

// NOTE: this component's test coverage is now included in mobile/button/__tests__/Button.test.tsx

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

  it('renders a pressable with eventConfig', () => {
    const mockEventConfig = {
      actions: ['click'],
      componentName: 'test',
    };
    render(<Button eventConfig={mockEventConfig}>Child</Button>);

    expect(useEventHandler).toHaveBeenCalledWith('Button', 'onPress', mockEventConfig);
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
});
