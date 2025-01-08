import { css } from '@linaria/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';

import { Spacer, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { Link, TextTitle1 } from '../../typography';
import { Banner } from '../Banner';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      observe: jest.fn(),
    };
  }),
}));

const { MockBanner } = bannerBuilder(
  Banner,
  Link,
  (props) => <TextTitle1 as="h1" {...props} />,
  VStack,
  Spacer,
);

const TEST_ID = 'test-banner';

describe('Banner Actions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo').mockImplementation();
  });
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByLabelText('close');

    fireEvent.click(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Banner collapses when dismiss icon button is pressed', async () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);
    const collapsibleTestID = `${TEST_ID}-collapsible`;

    const dismissBtn = screen.getByLabelText('close');

    // Before dismiss is pressed, banner should be visible
    expect(screen.getByTestId(collapsibleTestID)).toHaveAttribute('aria-hidden', 'false');

    fireEvent.click(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    await waitFor(() => {
      expect(screen.getByTestId(collapsibleTestID)).toHaveAttribute('aria-hidden', 'true');
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

  it('renders error banner correctly on light mode', () => {
    render(
      <Banner startIcon="cashUSD" testID={TEST_ID} title="error banner" variant="error">
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(255, 242, 178)' });
    expect(screen.getByTestId(`${TEST_ID}-icon-glyph`)).toHaveStyle({ color: 'rgb(237, 112, 47)' });
  });

  it('renders error banner correctly on dark mode', () => {
    render(
      <ThemeProvider spectrum="dark">
        <Banner startIcon="cashUSD" testID={TEST_ID} title="error banner" variant="error">
          Banner Content
        </Banner>
      </ThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(65, 27, 0)' });
    expect(screen.getByTestId(`${TEST_ID}-icon-glyph`)).toHaveStyle({ color: 'rgb(248, 150, 86)' });
  });
});
