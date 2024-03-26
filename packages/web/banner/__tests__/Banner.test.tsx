import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { css } from 'linaria';
import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';

import { Spacer, VStack } from '../../layout';
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

  it('Bannner collapses when dismiss icon button is pressed', async () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);
    const collapsibleTestID = `${TEST_ID}-collapsible`;

    const dismissBtn = screen.getByLabelText('close');

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
});
