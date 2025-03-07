import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Link } from '../Link';

const handlePress = () => {};
const testID = 'link-label';

describe('Link', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Link font="body" to="/">
          Child
        </Link>,
      ),
    ).toHaveNoViolations();
  });

  it('able to set accessibilityLabel', async () => {
    const accessibilityLabel = 'link-accessibility-label';
    render(
      <Link accessibilityLabel={accessibilityLabel} font="body" to="/">
        Child
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', accessibilityLabel);
  });

  it('should render with anchor element', async () => {
    render(
      <Link font="body" to="/">
        Child
      </Link>,
    );
    expect(screen.getByRole('link')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('should render with button element if no href', async () => {
    render(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link font="body" onClick={handlePress}>
        Child
      </Link>,
    );
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('can set openInNewWindow to true', async () => {
    render(
      <Link openInNewWindow font="body" testID={testID} to="/">
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('target', '_blank');
  });

  it('can set openInNewWindow to false', async () => {
    render(
      <Link font="body" openInNewWindow={false} testID={testID} to="/">
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).not.toHaveAttribute('target');
  });

  it('doesnt set target or rel if a button', async () => {
    render(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link openInNewWindow font="body" testID={testID}>
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).not.toHaveAttribute('target');
    expect(screen.getByTestId(testID)).not.toHaveAttribute('rel');
    expect(screen.getByTestId(testID)).not.toHaveAttribute('href');
  });

  it('defaults to noopener noreferrer when openInNewWindow', async () => {
    render(
      <Link openInNewWindow font="body" testID={testID} to="https://www.coinbase.com/">
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('set rel to noopener', async () => {
    render(
      <Link font="body" rel="noopener" testID={testID} to="https://www.coinbase.com/">
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noopener');
  });

  it('set rel to noreferrer', async () => {
    render(
      <Link font="body" rel="noreferrer" testID={testID} to="https://www.coinbase.com/">
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('rel', 'noreferrer');
  });

  it('to is set correctly', async () => {
    const url = 'https://www.google.com/';
    render(
      <Link font="body" testID={testID} to={url}>
        Child
      </Link>,
    );
    expect(screen.getByTestId(testID)).toHaveAttribute('href', url);
  });

  it('inherits text styles', () => {
    render(
      <Link font="inherit" testID={testID} to="/">
        Child
      </Link>,
    );

    expect(screen.getByTestId(testID).className).toContain('inherit');
  });

  it('inherits by default', () => {
    const url = 'https://www.coinbase.com/';
    render(
      <Link testID={testID} to={url}>
        Child
      </Link>,
    );

    expect(screen.getByText('Child').className).toContain('inherit');
  });
});
