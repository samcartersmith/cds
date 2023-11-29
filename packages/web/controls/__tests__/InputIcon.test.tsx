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
    secondary: 'secondary',
  } as const;

  Object.entries(variantsToFocusedColor).map(([variant, focusedColor]) => {
    return it(`${variant} TextInput will set icon to ${focusedColor} when focused`, () => {
      render(
        <TextInput
          key={`${variant}-inputicon`}
          label="Label"
          start={<InputIcon name="add" testID="input-icon" />}
          testID="text-input"
          variant={variant as InputVariant}
        />,
      );

      fireEvent.click(screen.getByRole('textbox'));

      expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${focusedColor}`);
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
        start={<InputIcon color={variant} name="add" testID="input-icon" />}
        testID="text-input"
        variant={variant as InputVariant}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${variant}`);
  });
});
