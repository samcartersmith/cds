import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { AccessibilityAnnouncer } from '../AccessibilityAnnouncer';

const TEST_ID = 'accessibility-announcer-id';
const TEST_MESSAGE = 'This is a really great message!';

describe('AccessibilityAnnouncer', () => {
  it('Passes accessibility (hehe)', async () => {
    expect(
      await renderA11y(<AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} />),
    ).toHaveNoViolations();
  });

  it('Properly configures testIDs', () => {
    render(<AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(`${TEST_ID}--message`)).toBeVisible();
  });

  it('Announces messages', () => {
    render(<AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} />);

    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
  });

  it('Is polite by default', () => {
    render(<AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-live', 'polite');
  });

  it('Is assertive when necessary', () => {
    render(
      <AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} politeness="assertive" />,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-live', 'assertive');
  });

  it('Removes itself from the DOM to make room for the next message', async () => {
    render(<AccessibilityAnnouncer testID={TEST_ID} message={TEST_MESSAGE} />, {
      legacyRoot: true,
    });

    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
    await waitForElementToBeRemoved(screen.queryByText(TEST_MESSAGE), { timeout: 600 });
  });
});
