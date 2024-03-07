import 'react-native';

import { createRef } from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Numpad } from '../Numpad';

describe('Numpad', () => {
  it('renders without crashing', () => {
    render(<Numpad onPress={NoopFn} testID="mock-numpad" />);
    expect(screen.getByTestId('mock-numpad')).toBeTruthy();
  });

  it('dispatches onPress events for number buttons', () => {
    const onPress = jest.fn();
    render(<Numpad onPress={onPress} />);

    fireEvent.press(screen.getByText('1'));
    expect(onPress).toHaveBeenCalledWith(1);
  });

  it('dispatches onPress events for separator button', () => {
    const onPress = jest.fn();
    render(<Numpad onPress={onPress} />);

    fireEvent.press(screen.getByText('.'));
    expect(onPress).toHaveBeenCalledWith('SEPARATOR');
  });

  it('dispatches onPress events for back button', () => {
    const onPress = jest.fn();
    render(<Numpad onPress={onPress} />);

    fireEvent.press(screen.getByTestId('numpad-back'));
    expect(onPress).toHaveBeenCalledWith('DELETE');
  });

  it('dispatches onLongPress events', () => {
    const onLongPress = jest.fn();
    render(<Numpad onLongPress={onLongPress} onPress={NoopFn} />);

    fireEvent(screen.getByText('1'), 'onLongPress');

    expect(onLongPress).toHaveBeenCalledWith(1);
  });

  it('renders accessory and action nodes when passed', () => {
    const accessory = <Text>Accessory</Text>;
    const action = <Text>Action</Text>;
    render(<Numpad accessory={accessory} action={action} onPress={NoopFn} />);

    expect(screen.getByText('Accessory')).toBeTruthy();
    expect(screen.getByText('Action')).toBeTruthy();
  });

  it('renders custom separator when passed', () => {
    const separator = '*';
    render(<Numpad onPress={NoopFn} separator={separator} />);

    expect(screen.getByText(separator)).toBeTruthy();
  });

  it('does not render seperator when null', () => {
    render(<Numpad onPress={NoopFn} separator="" />);

    expect(screen.queryByText('.')).toBeNull();
  });

  it('forwards ref', () => {
    const ref = createRef<View>();
    render(<Numpad ref={ref} onPress={NoopFn} />);

    expect(ref.current).toBeTruthy();
  });

  it('does not dispatch onPress or onLongPress events when disabled', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    render(<Numpad disabled onLongPress={onLongPress} onPress={onPress} />);

    fireEvent.press(screen.getByText('1'));
    fireEvent(screen.getByText('1'), 'onLongPress');

    expect(onPress).not.toHaveBeenCalled();
    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('applies correct accessibilityLabel to separator when separatorAccessibilityLabel prop is passed', () => {
    const separatorAccessibilityLabel = 'numpad-separator';
    render(<Numpad onPress={NoopFn} separatorAccessibilityLabel={separatorAccessibilityLabel} />);

    const separator = screen.getByTestId('numpad-separator');
    expect(separator.props.accessibilityLabel).toBe(separatorAccessibilityLabel);
  });

  it('applies correct accessibilityLabel to back button when deleteAccessibilityLabel prop is passed', () => {
    const deleteAccessibilityLabel = 'numpad-back';
    render(<Numpad deleteAccessibilityLabel={deleteAccessibilityLabel} onPress={NoopFn} />);

    const backButton = screen.getByTestId('numpad-back');
    expect(backButton.props.accessibilityLabel).toBe(deleteAccessibilityLabel);
  });
});
