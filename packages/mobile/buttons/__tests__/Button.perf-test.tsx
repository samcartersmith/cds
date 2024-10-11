import { fireEvent, render, screen } from '@testing-library/react-native';
import { measureRenders } from 'reassure';

import { Button } from '../Button';

describe('Button performance tests', () => {
  it('fires `onPress` when clicked', () => {
    const onPressMock = jest.fn();
    render(<Button onPress={onPressMock}>Click Me</Button>);

    fireEvent.press(screen.getByText('Click Me'));

    expect(onPressMock).toHaveBeenCalled();
  });
  it('renders when loading', async () => {
    await measureRenders(<Button loading>Child</Button>);
  });
});
