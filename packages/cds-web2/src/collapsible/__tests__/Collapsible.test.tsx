import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  collapsibleBuilder,
  CreateCollapsibleProps,
} from '@cbhq/cds-common2/internal/collapsibleBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { TextBody } from '../../typography/TextBody';
import { Collapsible } from '../Collapsible';

const { MockCollapsible } = collapsibleBuilder({
  Collapsible,
  Button,
  TextBody,
  DotCount,
  HStack,
} as CreateCollapsibleProps);

describe('Collapsible', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockCollapsible />)).toHaveNoViolations();
  });

  it('shows and hides content', async () => {
    render(<MockCollapsible />);
    expect(screen.getByTestId('mock-collapse')).toHaveStyle('visibility: hidden');
    expect(screen.getByText('Collapsible Content')).not.toBeVisible();

    fireEvent.click(screen.getByText('Click me!'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-collapse')).toHaveStyle('visibility: visible');
    });
    await waitFor(() => {
      expect(screen.getByText('Collapsible Content')).toBeVisible();
    });

    fireEvent.click(screen.getByText('Click me!'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-collapse')).toHaveStyle('visibility: hidden');
    });
    await waitFor(() => {
      expect(screen.getByText('Collapsible Content')).not.toBeVisible();
    });
  });
});
