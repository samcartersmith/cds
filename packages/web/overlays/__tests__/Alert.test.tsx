import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../buttons';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const TITLE = 'Alert title';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

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

  it('has expected default a11y attrs', () => {
    render(<MockAlert visible />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/:r[0-9].*/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/:r[0-9].*/));
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(<MockAlert visible accessibilityLabelledBy={LABELLED_BY} />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(<MockAlert visible accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(<MockAlert visible accessibilityLabelledBy={LABELLED_BY} accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('shows alert on press', async () => {
    render(<MockAlert />);

    fireEvent.click(screen.getByText('Show Alert'));

    const alert = await screen.findByRole('alertdialog');

    expect(alert).toBeTruthy();
  });

  it('renders title', async () => {
    const title = 'Test title';

    render(<MockAlert visible title={title} />);

    const found = await screen.findByText(title);

    // need to use waitFor here or test is flaky for some reason
    await waitFor(() => expect(found).toBeVisible());
  });

  it('renders body', async () => {
    const body = 'Test body';

    render(<MockAlert visible body={body} />);

    const found = await screen.findByText(body);

    // need to use waitFor here or test is flaky for some reason
    await waitFor(() => expect(found).toBeVisible());
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
