import { render } from '@testing-library/react-native';

import { InputIconButton } from '../InputIconButton';

const INPUTICONBUTTON_TEST_ID = 'input-iconbutton';

describe('InputIconButton', () => {
  it('renders an InputIconButton', () => {
    const result = render(
      <InputIconButton testID={INPUTICONBUTTON_TEST_ID} variant="foregroundMuted" name="add" />,
    );
    expect(result.getByTestId(INPUTICONBUTTON_TEST_ID)).toBeTruthy();
  });
});
