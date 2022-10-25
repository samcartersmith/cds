import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { iconGlyphMap } from '../../icons/iconGlyphMap';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders a Pressable', () => {
    render(<Checkbox>Checkbox</Checkbox>);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(screen.getByText('Checkbox')).toBeTruthy();
  });

  it('renders a check icon when checked', () => {
    render(<Checkbox checked>Checked</Checkbox>);

    const icon = screen.getByText(iconGlyphMap.checkmark['16']);
    expect(icon).toBeTruthy();
  });

  it('attaches testID', () => {
    const TEST_ID = 'checkbox-testid-test';
    render(<Checkbox testID={TEST_ID}>Checkbox</Checkbox>);

    expect(screen.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role checkbox', () => {
    render(<Checkbox>Checkbox</Checkbox>);

    expect(screen.queryAllByRole('switch')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', () => {
    render(<Checkbox checked>Checked</Checkbox>);

    expect(screen.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', () => {
    render(<Checkbox disabled>Disabled</Checkbox>);

    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    render(<Checkbox onChange={spy}>Checkbox</Checkbox>);

    fireEvent.press(screen.getByText('Checkbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('if children is a string, the accessibilityLabel and accessibilityHint is set to its children by default', () => {
    render(<Checkbox>Checkbox</Checkbox>);

    expect(screen.getByLabelText('Checkbox')).toBeTruthy();
    expect(screen.getByA11yHint('Checkbox')).toBeTruthy();
  });

  it('if children is a string, you can still override the accessibilityLabel and accessibilityHint', () => {
    render(
      <Checkbox accessibilityHint="Custom Checkbox" accessibilityLabel="Custom Checkbox">
        Checkbox
      </Checkbox>,
    );

    expect(screen.getByLabelText('Custom Checkbox')).toBeTruthy();
    expect(screen.getByA11yHint('Custom Checkbox')).toBeTruthy();
  });

  it('does not fires `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    render(
      <Checkbox disabled onChange={spy}>
        Checkbox
      </Checkbox>,
    );

    fireEvent.press(screen.getByText('Checkbox'));

    expect(spy).not.toHaveBeenCalled();
  });
});
