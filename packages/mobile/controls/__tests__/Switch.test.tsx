/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { useState } from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('handles input', () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);
      const onChange = () => setChecked((chk) => !chk);
      return (
        <View>
          <Text>checked is {checked ? 'true' : 'false'}</Text>
          <Switch onChange={onChange} checked={checked}>
            test label
          </Switch>
        </View>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('checked is false')).toBeTruthy();

    fireEvent.press(screen.getByRole('switch'));

    expect(screen.getByText('checked is true')).toBeTruthy();

    fireEvent.press(screen.getByRole('switch'));

    expect(screen.getByText('checked is false')).toBeTruthy();
  });

  it('passes accessibility', () => {
    render(<Switch onChange={jest.fn()}>test label</Switch>);
    expect(screen.getByRole('switch')).toBeAccessible({
      // disable 'disabled-state-required' since it's flagging passing disabled
      // to Interactable and unclear if we're lacking a11y affordances here
      customViolationHandler: (violations) => {
        return violations.filter(
          (v) =>
            v.problem !== "This component has a disabled state but it isn't exposed to the user",
        );
      },
    });
  });

  it('renders label', () => {
    render(<Switch onChange={jest.fn()}>test label</Switch>);

    expect(screen.getByText('test label')).toBeTruthy();
  });

  it('renders accessibilityLabel', () => {
    render(
      <Switch
        onChange={jest.fn()}
        accessibilityLabel="test accessibility label"
        accessibilityHint="test accessibility hint"
      >
        test label
      </Switch>,
    );

    expect(screen.getByLabelText('test accessibility label')).toBeTruthy();
  });

  it('triggers onPress when pressed', () => {
    const onPress = jest.fn();

    render(<Switch onPress={onPress} />);

    fireEvent.press(screen.getByRole('switch'));

    expect(onPress).toHaveBeenCalled();
  });

  it('disables user interaction when disabled', () => {
    const onChange = jest.fn();

    render(<Switch onChange={onChange} disabled />);

    fireEvent.press(screen.getByRole('switch'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };

    render(<Switch ref={ref} onChange={jest.fn()} />);

    expect(ref.current).not.toBeNull();
  });

  it('renders testID', () => {
    render(<Switch onChange={jest.fn()} testID="test-test-id" />);

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });
});
