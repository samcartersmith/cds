import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { iconGlyphMap } from '../../icons/iconGlyphMap';
import { Radio } from '../RadioGroup';

describe('Radio', () => {
  it('renders a Pressable', () => {
    render(<Radio>Radio</Radio>);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(screen.getByText('Radio')).toBeTruthy();
  });

  it('renders a dot icon when checked', () => {
    render(<Radio checked>Checked</Radio>);

    const icon = screen.getByText(iconGlyphMap.dot['16']);
    expect(icon).toBeTruthy();
  });

  it('attaches testID', () => {
    const TEST_ID = 'radio-testid-test';
    render(<Radio testID={TEST_ID}>Radio</Radio>);

    expect(screen.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role radio', () => {
    render(<Radio>Radio</Radio>);

    expect(screen.queryAllByRole('radio')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', () => {
    render(<Radio checked>Checked</Radio>);

    expect(screen.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', () => {
    render(<Radio disabled>Disabled</Radio>);

    expect(screen.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('Can set custom accessibility label and hints', () => {
    render(
      <Radio accessibilityHint="Custom hint" accessibilityLabel="Custom label">
        Checkbox
      </Radio>,
    );

    expect(screen.getByLabelText('Custom label')).toBeTruthy();
    expect(screen.getByA11yHint('Custom hint')).toBeTruthy();
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    render(<Radio onChange={spy}>Radio</Radio>);

    fireEvent.press(screen.getByText('Radio'));

    expect(spy).toHaveBeenCalled();
  });

  it('does not fires `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    render(
      <Radio disabled onChange={spy}>
        Radio
      </Radio>,
    );

    fireEvent.press(screen.getByText('Radio'));

    expect(spy).not.toHaveBeenCalled();
  });
});
