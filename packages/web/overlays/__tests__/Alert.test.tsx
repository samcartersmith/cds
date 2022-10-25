import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { MockAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

describe('Alert', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<MockAlert visible />)).toHaveNoViolations();
  });

  it('passes a11y when visible', async () => {
    expect(
      await renderA11y(<MockAlert />, {
        async afterRender() {
          fireEvent.click(screen.getByRole('button'));

          return waitFor(() => screen.getByRole('alertdialog'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('show alert on press', async () => {
    render(<MockAlert />);

    fireEvent.click(screen.getByText('Show Alert'));

    const alert = await screen.findByRole('alertdialog');

    expect(alert).toBeTruthy();
  });

  it('renders title', async () => {
    const title = 'Test title';
    render(<MockAlert visible title={title} />);

    expect(await screen.findByText(title)).toBeVisible();
  });

  it('renders body', async () => {
    const body = 'Test body';
    render(<MockAlert visible body={body} />);

    expect(await screen.findByText(body)).toBeVisible();
  });

  it('renders preferred action', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <MockAlert
        visible
        preferredActionLabel="Save"
        onPreferredActionPress={onPreferredActionPress}
        onRequestClose={onRequestClose}
      />,
    );

    fireEvent.click(screen.getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
  });

  it('renders dismiss action', async () => {
    const onRequestClose = jest.fn();

    render(<MockAlert visible dismissActionLabel="Cancel" onRequestClose={onRequestClose} />);

    expect(await screen.findByText('Cancel')).toBeTruthy();
  });
});
