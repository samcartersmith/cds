import { fireEvent, render, waitFor } from '@testing-library/react';
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
        async afterRender({ container, getByRole }) {
          fireEvent.click(container.querySelector('button') as Element);

          return waitFor(() => getByRole('alertdialog'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('show alert on press', async () => {
    const { getByRole, getByText } = render(<MockAlert />);

    fireEvent.click(getByText('Show Alert'));

    const alert = await waitFor(() => getByRole('alertdialog'));

    expect(alert).toBeTruthy();
  });

  it('renders title', async () => {
    const title = 'Test title';
    const { findByText } = render(<MockAlert visible title={title} />);

    expect(await findByText(title)).toBeVisible();
  });

  it('renders body', async () => {
    const body = 'Test body';
    const { findByText } = render(<MockAlert visible body={body} />);

    expect(await findByText(body)).toBeVisible();
  });

  it('renders preferred action', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    const { getByText } = render(
      <MockAlert
        visible
        preferredActionLabel="Save"
        onPreferredActionPress={onPreferredActionPress}
        onRequestClose={onRequestClose}
      />,
    );

    fireEvent.click(getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
  });

  it('renders dismiss action', async () => {
    const onRequestClose = jest.fn();

    const { findByText } = render(
      <MockAlert visible dismissActionLabel="Cancel" onRequestClose={onRequestClose} />,
    );

    expect(await findByText('Cancel')).toBeTruthy();
  });
});
