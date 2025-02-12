import { render, screen } from '@testing-library/react';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { DefaultThemeProvider } from '../../utils/test';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  const mockOnChange = jest.fn();
  it('renders a check icon when checked', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox checked onChange={mockOnChange}>
          Checked
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['ui-checkmark-12']);
    expect(icon).toBeTruthy();
  });

  it('renders a minus icon when indeterminate', () => {
    render(
      <DefaultThemeProvider>
        <Checkbox indeterminate onChange={mockOnChange}>
          Indeterminate
        </Checkbox>
      </DefaultThemeProvider>,
    );

    const icon = screen.getByText(glyphMap['ui-minus-12']);
    expect(icon).toBeTruthy();
  });
});
