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

  it('shows and hides content', async () => {
    const { getByTestId, getByText } = render(<MockCollapsible />);
    expect(getByTestId('mock-collapse')).toHaveStyle('visibility: hidden');
    expect(getByText('Collapsible Content')).not.toBeVisible();

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => {
      expect(getByTestId('mock-collapse')).toHaveStyle('visibility: visible');
      expect(getByText('Collapsible Content')).toBeVisible();
    });

    fireEvent.click(getByText('Click me!'));
    await waitFor(() => {
      expect(getByTestId('mock-collapse')).toHaveStyle('visibility: hidden');
      expect(getByText('Collapsible Content')).not.toBeVisible();
    });
  });
});
