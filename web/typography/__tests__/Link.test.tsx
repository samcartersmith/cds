import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { Link } from '../Link';

const handlePress = () => {};
const testID = 'link-label';

describe('Link', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Link variant="body" to="/">
          Child
        </Link>,
      ),
    ).toHaveNoViolations();
  });

  it('able to set accessibilityLabel', async () => {
    const accessibilityLabel = 'link-accessibility-label';
    const { container } = render(
      <Link variant="body" to="/" accessibilityLabel={accessibilityLabel}>
        Child
      </Link>,
    );
    expect(container.querySelector('a')).toHaveAttribute('aria-label', accessibilityLabel);
  });

  it('should render with anchor element', async () => {
    const { container } = render(
      <Link variant="body" to="/">
        Child
      </Link>,
    );
    expect(container.querySelector('a')).toBeTruthy();
    expect(container.querySelector('button')).toBeFalsy();
  });

  it('should render with button element if no href', async () => {
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link variant="body" onPress={handlePress}>
        Child
      </Link>,
    );
    expect(container.querySelector('a')).toBeFalsy();
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('can set openInNewWindow to true', async () => {
    const { getByTestId } = render(
      <Link variant="body" to="/" openInNewWindow testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).toHaveAttribute('target', '_blank');
  });

  it('can set openInNewWindow to false', async () => {
    const { getByTestId } = render(
      <Link variant="body" to="/" openInNewWindow={false} testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).not.toHaveAttribute('target');
  });

  it('doesnt set target or rel if a button', async () => {
    const { getByTestId } = render(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link variant="body" openInNewWindow testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).not.toHaveAttribute('target');
    expect(getByTestId(testID)).not.toHaveAttribute('rel');
    expect(getByTestId(testID)).not.toHaveAttribute('href');
  });

  it('defaults to noopener noreferrer when openInNewWindow', async () => {
    const { getByTestId } = render(
      <Link variant="body" to="https://www.coinbase.com/" openInNewWindow testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('set rel to noopener', async () => {
    const { getByTestId } = render(
      <Link variant="body" to="https://www.coinbase.com/" rel="noopener" testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noopener');
  });

  it('set rel to noreferrer', async () => {
    const { getByTestId } = render(
      <Link variant="body" to="https://www.coinbase.com/" rel="noreferrer" testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noreferrer');
  });

  it('to is set correctly', async () => {
    const url = 'https://www.google.com/';
    const { getByTestId } = render(
      <Link variant="body" to={url} testID={testID}>
        Child
      </Link>,
    );
    expect(getByTestId(testID)).toHaveAttribute('href', url);
  });

  it('inherits text styles', () => {
    const url = 'https://www.coinbase.com/';
    const { getByText } = render(
      <Link variant="inherit" to={url} testID={testID}>
        Child
      </Link>,
    );
    expect(getByText('Child')).toHaveClass('textInherit');
  });

  it('inherits by default', () => {
    const url = 'https://www.coinbase.com/';
    const { getByText } = render(
      <Link to={url} testID={testID}>
        Child
      </Link>,
    );
    expect(getByText('Child')).toHaveClass('textInherit');
  });
});
