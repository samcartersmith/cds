import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { gap as gapStyles } from '../../styles/gap';
import { responsiveClassName } from '../../styles/responsive';
import { cx } from '../../utils/linaria';
import { GridColumn } from '../GridColumn';

jest.mock('../../hooks/useResponsiveConfig', () => ({
  ...jest.requireActual<object>('../../hooks/useResponsiveConfig'),
  useResponsiveConfig: jest.fn(() => 'test-responsive-class-name'),
}));

describe('GridColumn', () => {
  const TEST_ID = 'grid-column-test';
  it('attaches testID', () => {
    render(<GridColumn testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<GridColumn />)).toHaveNoViolations();
  });

  it('should set responsive config class names', () => {
    render(
      <GridColumn
        responsiveConfig={{
          phone: {
            spacing: 2,
            gap: 0.5,
          },
        }}
        testID={TEST_ID}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveClass('test-responsive-class-name');
  });

  it('can set responsive class name', () => {
    render(
      <GridColumn
        responsiveConfig={{
          phone: {
            spacing: 2,
            gap: 0.5,
          },
        }}
        testID={TEST_ID}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveClass(responsiveClassName);
  });

  it('can set custom styles', () => {
    render(
      <GridColumn
        style={{
          backgroundColor: 'red',
        }}
        testID={TEST_ID}
      />,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('can set gap', () => {
    render(<GridColumn gap={2} testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass(cx(gapStyles[2]));
  });
});
