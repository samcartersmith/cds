import { render } from '@testing-library/react-native';

import { InputIcon } from '../InputIcon';

const INPUTICON_TEST_ID = 'input-icon';

describe('InputIcon', () => {
  it('renders an InputIcon', () => {
    const result = render(<InputIcon testID={INPUTICON_TEST_ID} color="foreground" name="add" />);
    expect(result.getByTestId(INPUTICON_TEST_ID)).toBeTruthy();
  });
});
