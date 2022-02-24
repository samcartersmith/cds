import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { collapseBuilder, CreateCollapseProps } from '@cbhq/cds-common/internal/collapseBuilder';

import { Collapse } from '../Collapse';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';

const { MockCollapse } = collapseBuilder({
  Collapse,
  Button,
  TextBody,
} as CreateCollapseProps);

describe('Collapse', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockCollapse />)).toHaveNoViolations();
  });

  it('has correct css styles', async () => {
    const { getByTestId, getByText } = render(<MockCollapse />);
    expect(getByTestId('mock-collapse')).toHaveStyle('display: none');

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => expect(getByTestId('mock-collapse')).toHaveStyle('display: block'));

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => expect(getByTestId('mock-collapse')).toHaveStyle('display: none'));
  });

  it('renders children', () => {
    const { getByText } = render(<MockCollapse />);

    expect(getByText('Collapse Content')).toBeTruthy();
  });
});
