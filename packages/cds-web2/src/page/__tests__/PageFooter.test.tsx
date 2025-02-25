import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageFooterBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Button } from '../../buttons';
import * as useBreakpoints from '../../hooks/useBreakpoints';
import { Box } from '../../layout';
import { DefaultThemeProvider } from '../../utils/test';
import { PageFooter } from '../PageFooter';

const defaultProps: PageFooterBaseProps = {
  action: <Box>End</Box>,
  background: 'bgPrimaryWash',
};

describe('PageFooter', () => {
  beforeEach(() => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: false,
    }));
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<PageFooter {...defaultProps} />)).toHaveNoViolations();
  });

  it('justifies content to the center on mobile devices', () => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: true,
    }));
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('contentinfo').className).toContain('center');
  });

  it('justifies content to the flex-end on desktop', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('contentinfo').className).toContain('flex-end');
  });

  it('renders the action component correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter action={<Button>Save</Button>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies the background prop correctly', () => {
    render(<PageFooter {...defaultProps} />);
    expect(screen.getByRole('contentinfo')).toHaveStyle('background: bgPrimaryWash');
  });
});
