import { Pressable } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { iconGlyphMap } from '../../icons/iconGlyphMap';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders a Pressable', () => {
    const result = render(<Checkbox>Checkbox</Checkbox>);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(result.queryByText('Checkbox')).toBeTruthy();
  });

  it('renders a check icon when checked', () => {
    const result = render(<Checkbox checked>Checked</Checkbox>);

    const icon = result.getByText(iconGlyphMap.checkmark['16']);
    expect(icon).toBeTruthy();
  });

  it('attaches testID', () => {
    const TEST_ID = 'checkbox-testid-test';
    const result = render(<Checkbox testID={TEST_ID}>Checkbox</Checkbox>);

    expect(result.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role checkbox', () => {
    const result = render(<Checkbox>Checkbox</Checkbox>);

    expect(result.queryAllByRole('switch')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', () => {
    const result = render(<Checkbox checked>Checked</Checkbox>);

    expect(result.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', () => {
    const result = render(<Checkbox disabled>Disabled</Checkbox>);

    expect(result.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    const result = render(<Checkbox onChange={spy}>Checkbox</Checkbox>);

    fireEvent.press(result.getByText('Checkbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('if children is a string, the accessibilityLabel and accessibilityHint is set to its children by default', () => {
    const result = render(<Checkbox>Checkbox</Checkbox>);

    expect(result.getByLabelText('Checkbox')).toBeTruthy();
    expect(result.queryByA11yHint('Checkbox')).toBeTruthy();
  });

  it('if children is a string, you can still override the accessibilityLabel and accessibilityHint', () => {
    const result = render(
      <Checkbox accessibilityHint="Custom Checkbox" accessibilityLabel="Custom Checkbox">
        Checkbox
      </Checkbox>,
    );

    expect(result.getByLabelText('Custom Checkbox')).toBeTruthy();
    expect(result.queryByA11yHint('Custom Checkbox')).toBeTruthy();
  });

  it('does not fires `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    const result = render(
      <Checkbox disabled onChange={spy}>
        Checkbox
      </Checkbox>,
    );

    fireEvent.press(result.getByText('Checkbox'));

    expect(spy).not.toHaveBeenCalled();
  });
});
