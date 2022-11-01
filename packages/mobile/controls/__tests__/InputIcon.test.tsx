import { render, screen } from '@testing-library/react-native';

import { InputIcon } from '../InputIcon';

const INPUTICON_TEST_ID = 'input-icon';

describe('InputIcon', () => {
  it('passes a11y', () => {
    render(<InputIcon testID={INPUTICON_TEST_ID} color="foreground" name="add" />);
    expect(screen.getByTestId(INPUTICON_TEST_ID)).toBeAccessible();
  });
  it('renders an InputIcon', () => {
    render(<InputIcon testID={INPUTICON_TEST_ID} color="foreground" name="add" />);
    expect(screen.getByTestId(INPUTICON_TEST_ID)).toBeTruthy();
  });
});
