import { iconGlyphMap } from '@cbhq/cds-mobile/icons/iconGlyphMap';
import { fireEvent, render } from '@testing-library/react-native';
import { Pressable } from 'react-native';

import { Radio } from '../RadioGroup';

describe('Radio', () => {
  it('renders a Pressable', () => {
    const result = render(<Radio>Radio</Radio>);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
    expect(result.queryByText('Radio')).toBeTruthy();
  });

  it('renders a dot icon when checked', () => {
    const result = render(<Radio checked>Checked</Radio>);

    const icon = result.getByText(iconGlyphMap.dot['16']);
    expect(icon).toBeTruthy();
  });

  it('attaches testID', () => {
    const TEST_ID = 'radio-testid-test';
    const result = render(<Radio testID={TEST_ID}>Radio</Radio>);

    expect(result.queryAllByTestId(TEST_ID)).toHaveLength(1);
  });

  it('has accessibility role radio', async () => {
    const result = render(<Radio>Radio</Radio>);

    expect(result.queryAllByA11yRole('radio')).toHaveLength(1);
  });

  it('has accessibility state checked when checked', async () => {
    const result = render(<Radio checked>Checked</Radio>);

    expect(result.queryAllByA11yState({ checked: true })).toHaveLength(1);
  });

  it('has accessibility state disabled when disabled', async () => {
    const result = render(<Radio disabled>Disabled</Radio>);

    expect(result.queryAllByA11yState({ disabled: true })).toHaveLength(1);
  });

  it('fires `onChange` when pressed and not disabled', () => {
    const spy = jest.fn();
    const result = render(<Radio onChange={spy}>Radio</Radio>);

    fireEvent.press(result.getByText('Radio'));

    expect(spy).toHaveBeenCalled();
  });

  it('does not fires `onChange` when disabled and pressed', () => {
    const spy = jest.fn();
    const result = render(
      <Radio disabled onChange={spy}>
        Radio
      </Radio>
    );

    fireEvent.press(result.getByText('Radio'));

    expect(spy).not.toHaveBeenCalled();
  });
});
