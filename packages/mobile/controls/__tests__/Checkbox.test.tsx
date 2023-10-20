import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('passes a11y', () => {
    render(<Checkbox testID="mock-checkbox">Checkbox</Checkbox>);
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
  });
  it('renders a Pressable', () => {
    render(<Checkbox>Checkbox</Checkbox>);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(screen.getByText('Checkbox')).toBeTruthy();
  });

  it('renders a check icon when checked', () => {
    render(<Checkbox checked>Checked</Checkbox>);

    const icon = screen.getByText(glyphMap['ui-checkmark-16']);
    expect(icon).toBeTruthy();
  });
  it('checked Checkbox passes a11y', () => {
    render(
      <Checkbox checked testID="mock-checkbox">
        Checkbox
      </Checkbox>,
    );
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
  });

  it('renders a minus icon when indeterminate', () => {
    render(<Checkbox indeterminate>Indeterminate</Checkbox>);

    const icon = screen.getByText(glyphMap['ui-minus-16']);
    expect(icon).toBeTruthy();
  });
  it('indeterminate Checkbox passes a11y', () => {
    render(
      <Checkbox indeterminate testID="mock-checkbox">
        Checkbox
      </Checkbox>,
    );
    expect(screen.getByTestId('mock-checkbox')).toBeAccessible();
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

  it('disabled checkbox passes a11y', () => {
    render(
      <Checkbox disabled testID="disabled-checkbox">
        Disabled
      </Checkbox>,
    );

    expect(screen.getByTestId('disabled-checkbox')).toBeAccessible();
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
