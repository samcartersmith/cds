import { fireEvent, render, screen } from '@testing-library/react';
import { InputVariant, PaletteForeground } from '@cbhq/cds-common';

import { InputIconButton } from '../InputIconButton';
import { TextInput } from '../TextInput';

describe('Test InputIconButton inheritFocusedVariant interaction', () => {
  const variantsToFocusedColor: Record<InputVariant, PaletteForeground> = {
    foreground: 'secondary',
    foregroundMuted: 'primary',
    primary: 'primary',
    negative: 'secondary',
    positive: 'secondary',
    secondary: 'secondary',
  } as const;

  Object.entries(variantsToFocusedColor).map(([variant, focusedColor]) => {
    return it(`${variant} TextInput will set icon to ${focusedColor} when focused`, () => {
      render(
        <TextInput
          key={`${variant}-inputicon`}
          label="Label"
          start={<InputIconButton name="add" testID="input-icon" />}
          testID="text-input"
          variant={variant as InputVariant}
        />,
      );

      fireEvent.click(screen.getByRole('textbox'));

      expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${focusedColor}`);
    });
  });
});

describe('InputIconButton', () => {
  it(`Can override focused color provided by context.`, () => {
    const variant = 'foregroundMuted';

    render(
      <TextInput
        key={`${variant}-inputicon`}
        label="Label"
        start={<InputIconButton name="add" testID="input-icon" variant={variant} />}
        testID="text-input"
        variant={variant as InputVariant}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(screen.getByTestId('icon-base-glyph')).toHaveStyle(`color: var(--${variant}`);
  });
});
