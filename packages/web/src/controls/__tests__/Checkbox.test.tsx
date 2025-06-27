import { render, screen } from '@testing-library/react';
import { glyphMap } from '@cbhq/cds-icons/glyphMap';

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

    const icon = screen.getByText(glyphMap['checkmark-16-inactive']);
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

    const icon = screen.getByText(glyphMap['minus-16-inactive']);
    expect(icon).toBeTruthy();
  });
});
