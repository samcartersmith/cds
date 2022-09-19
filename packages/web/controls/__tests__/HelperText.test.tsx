import { render } from '@testing-library/react';

import { ThemeProvider } from '../../system';
import { HelperText } from '../HelperText';

describe('HelperText.test', () => {
  it('renders text', () => {
    const { getByText } = render(<HelperText>Test text</HelperText>);

    expect(getByText('Test text')).toBeTruthy();
  });

  it('renders dense text', () => {
    const { getByText } = render(
      <ThemeProvider scale="xSmall">
        <HelperText>Test text</HelperText>
      </ThemeProvider>,
    );

    expect(getByText('Test text')).toBeTruthy();
  });
});
