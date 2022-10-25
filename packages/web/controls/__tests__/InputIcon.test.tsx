import { fireEvent, render, screen } from '@testing-library/react';
import { InputVariant } from '@cbhq/cds-common';

import { InputIcon } from '../InputIcon';
import { TextInput } from '../TextInput';

describe('Test InputIcon inheritFocusedVariant interaction', () => {
  const variantsToFocusedColor: Record<InputVariant, InputVariant> = {
    foreground: 'primary',
    foregroundMuted: 'primary',
    primary: 'primary',
    negative: 'negative',
    positive: 'positive',
  } as const;

  Object.entries(variantsToFocusedColor).map(([variant, focusedColor]) => {
    return it(`${variant} TextInput will set icon to ${focusedColor} when focused`, () => {
      render(
        <TextInput
          key={`${variant}-inputicon`}
          label="Label"
          testID="text-input"
          variant={variant as InputVariant}
          start={<InputIcon testID="input-icon" name="add" />}
        />,
      );

      fireEvent.click(screen.getByRole('textbox'));

      expect(screen.getByRole('presentation')).toHaveStyle(`color: var(--${focusedColor}`);
    });
  });
});

describe('InputIcon', () => {
  it(`Can override focused color provided by context.`, () => {
    const variant = 'foreground';

    render(
      <TextInput
        key={`${variant}-inputicon`}
        label="Label"
        testID="text-input"
        variant={variant as InputVariant}
        start={<InputIcon testID="input-icon" color={variant} name="add" />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByRole('presentation')).toHaveStyle(`color: var(--${variant}`);
  });
});
