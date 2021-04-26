import React from 'react';

import { render } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { Link } from '../Link';

const testID = 'link-label';

describe('Link', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Link to="">Child</Link>)).toHaveNoViolations();
  });

  it('able to set accessibilityLabel', async () => {
    const accessibilityLabel = 'link-accessibility-label';
    const { container } = render(
      <Link to="/" accessibilityLabel={accessibilityLabel}>
        Child
      </Link>
    );
    expect(container.querySelector('a')).toHaveAttribute('aria-label', accessibilityLabel);
  });

  it('should render with anchor element', async () => {
    const { container } = render(<Link to="/">Child</Link>);
    expect(container.querySelector('a')).toBeTruthy();
  });

  it('can set openInNewWindow to true', async () => {
    const { getByTestId } = render(
      <Link to="/" openInNewWindow={true} testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('target', '_blank');
  });

  it('can set openInNewWindow to false', async () => {
    const { getByTestId } = render(
      <Link to="/" openInNewWindow={false} testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('target', '');
  });

  it('defaults to noopener noreferrer when openInNewWindow', async () => {
    const { getByTestId } = render(
      <Link to="https://www.coinbase.com/" openInNewWindow={true} testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('set rel to noopener', async () => {
    const { getByTestId } = render(
      <Link to="https://www.coinbase.com/" rel="noopener" testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noopener');
  });

  it('set rel to noreferrer', async () => {
    const { getByTestId } = render(
      <Link to="https://www.coinbase.com/" rel="noreferrer" testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('rel', 'noreferrer');
  });

  it('to is set correctly', async () => {
    const url = 'https://www.google.com/';
    const { getByTestId } = render(
      <Link to={url} testID={testID}>
        Child
      </Link>
    );
    expect(getByTestId(testID)).toHaveAttribute('href', url);
  });
});
