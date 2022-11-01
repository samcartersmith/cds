import { render, screen } from '@testing-library/react-native';

import { InputIconButton } from '../InputIconButton';

const INPUTICONBUTTON_TEST_ID = 'input-iconbutton';

describe('InputIconButton', () => {
  it('passes a11y', () => {
    render(
      <InputIconButton testID={INPUTICONBUTTON_TEST_ID} variant="foregroundMuted" name="add" />,
    );
    expect(screen.getByTestId(INPUTICONBUTTON_TEST_ID)).toBeAccessible();
  });
  it('renders an InputIconButton', () => {
    render(
      <InputIconButton testID={INPUTICONBUTTON_TEST_ID} variant="foregroundMuted" name="add" />,
    );
    expect(screen.getByTestId(INPUTICONBUTTON_TEST_ID)).toBeTruthy();
  });
});
