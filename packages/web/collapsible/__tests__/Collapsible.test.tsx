import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  collapsibleBuilder,
  CreateCollapsibleProps,
} from '@cbhq/cds-common/internal/collapsibleBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { TextBody } from '../../typography';
import { Collapsible } from '../Collapsible';

const { MockCollapsible } = collapsibleBuilder({
  Collapsible,
  Button,
  TextBody,
  DotCount,
  HStack,
} as CreateCollapsibleProps);

describe('Collapsible', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockCollapsible />)).toHaveNoViolations();
  });

  it('has correct css styles', async () => {
    const { getByTestId, getByText } = render(<MockCollapsible />);
    expect(getByTestId('mock-collapse')).toHaveStyle('visibility: hidden');

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => expect(getByTestId('mock-collapse')).toHaveStyle('visibility: visible'));

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => expect(getByTestId('mock-collapse')).toHaveStyle('visibility: hidden'));
  });

  it('renders children', () => {
    const { getByText } = render(<MockCollapsible />);

    expect(getByText('Collapsible Content')).toBeTruthy();
  });
});
