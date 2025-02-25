import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeaderBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';
import { renderA11y } from '@cbhq/cds-web-utils';

import * as useBreakpoints from '../../hooks/useBreakpoints';
import { Box } from '../../layout';
import { PageHeader } from '../PageHeader';

const defaultProps: PageHeaderBaseProps = {
  start: <Box>Start</Box>,
  title: <Box>Title</Box>,
  end: <Box>End</Box>,
};

describe('PageHeader', () => {
  beforeEach(() => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: false,
    }));
  });

  it('renders pageheader with all props and corrct classes', () => {
    render(<PageHeader {...defaultProps} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    const titleContainer = screen.getByTestId('responsive-title-container');
    expect(titleContainer.className).toContain('gridStylesMobileTitleClassName');

    const endContainer = screen.getByTestId('responsive-end-container');
    expect(endContainer.className).toContain('gridStylesMobileEndClassName');
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<PageHeader {...defaultProps} />)).toHaveNoViolations();
  });

  it('renders title correctly', () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders custom node for title', () => {
    const title = <div data-testid="custom-title">Custom Title</div>;
    render(<PageHeader {...defaultProps} title={title} />);
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders start, title, and end content correctly', () => {
    render(<PageHeader {...defaultProps} />);
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PageHeader {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    const testID = 'page-header';
    render(<PageHeader {...defaultProps} testID={testID} />);
    expect(screen.getByTestId(testID)).toBeInTheDocument();
  });
});
