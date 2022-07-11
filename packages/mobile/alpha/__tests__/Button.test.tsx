import { Animated, Pressable } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { useEventHandler } from '@cbhq/cds-common/system/useEventHandler';

import { debounce } from '../../utils/debounce';
import { Button } from '../Button';

jest.mock('@cbhq/cds-common/system/useEventHandler');
jest.mock('../../utils/debounce');

describe('Button', () => {
  it('renders an animated view', () => {
    const result = render(<Button>Child</Button>);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(<Button>Child</Button>);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
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
    const result = render(<Button>Child</Button>);

    expect(result.queryByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    const result = render(<Button onPress={spy}>Child</Button>);

    fireEvent.press(result.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });
});
