import { css } from '@linaria/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ThemeProvider } from '../../../system';
import { Banner, WebBannerProps } from '../Banner';

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  variant = 'warning',
  testID,
  ...props
}: Partial<WebBannerProps>) => (
  <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
    Banner content
  </Banner>
);

const TEST_ID = 'test-banner';

describe('Banner Actions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dimiss-btn`);

    fireEvent.click(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', async () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);
    const collapsibleTestID = `${TEST_ID}-collapsible`;

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dimiss-btn`);

    // Before dismiss is pressed, banner should be visible
    expect(screen.getByTestId(collapsibleTestID)).toHaveStyle('visibility: visible');

    fireEvent.click(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    await waitFor(() => {
      expect(screen.getByTestId(collapsibleTestID)).toHaveStyle('visibility: hidden');
    });
  });
});

describe('Banner', () => {
  it('can set className', () => {
    const customClassName = css`
      padding: 5px;
    `;

    render(
      <Banner
        className={customClassName}
        startIcon="cashUSD"
        testID={TEST_ID}
        title=""
        variant="warning"
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      padding: 5,
    });
  });

  it('can set style', () => {
    const customClassName = {
      position: 'sticky',
    } as const;

    render(
      <Banner
        startIcon="cashUSD"
        style={customClassName}
        testID={TEST_ID}
        title=""
        variant="warning"
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle(customClassName);
  });

  it('renders warning banner correctly on light mode', () => {
    render(
      <Banner startIcon="cashUSD" testID={TEST_ID} title="warning banner" variant="warning">
        Banner Content
      </Banner>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(255, 242, 178)' });
  });

  it('renders warning banner correctly on dark mode', () => {
    render(
      <ThemeProvider spectrum="dark">
        <Banner startIcon="cashUSD" testID={TEST_ID} title="warning banner" variant="warning">
          Banner Content
        </Banner>
      </ThemeProvider>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(65, 27, 0)' });
  });

  it('renders error banner correctly', () => {
    render(
      <Banner startIcon="cashUSD" testID={TEST_ID} title="error banner" variant="error">
        Banner Content
      </Banner>,
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(255, 245, 246)' });
  });

  it('renders informational banner correctly', () => {
    render(
      <Banner
        startIcon="cashUSD"
        testID={TEST_ID}
        title="informational banner"
        variant="informational"
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass('secondary');
  });

  it('renders promotional banner correctly', () => {
    render(
      <Banner startIcon="cashUSD" testID={TEST_ID} title="promotional banner" variant="promotional">
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass('primaryWash');
  });

  it('renders contextual banner by default', () => {
    render(
      <Banner startIcon="cashUSD" testID={TEST_ID} title="contextual banner" variant="warning">
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveClass('roundedLarge');
  });

  it('renders inline banner correctly', () => {
    render(
      <Banner
        startIcon="cashUSD"
        styleVariant="inline"
        testID={TEST_ID}
        title="inline banner"
        variant="warning"
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).not.toHaveClass('roundedLarge');
  });

  it('renders global banner correctly', () => {
    render(
      <Banner
        startIcon="cashUSD"
        styleVariant="global"
        testID={TEST_ID}
        title="global banner"
        variant="warning"
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).not.toHaveClass('roundedLarge');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ borderLeftWidth: 4 });
  });
});
