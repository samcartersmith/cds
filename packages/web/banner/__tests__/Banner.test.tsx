import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { css } from 'linaria';
import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';

import { Spacer, VStack } from '../../layout';
import { Link, TextTitle1 } from '../../typography';
import { Banner } from '../Banner';

const { MockBanner } = bannerBuilder(
  Banner,
  Link,
  (props) => <TextTitle1 as="h1" {...props} />,
  VStack,
  Spacer,
);

const TEST_ID = 'test-banner';

describe('Banner Actions', () => {
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner testID={TEST_ID} onClose={spy} showDismiss />);

    const dismissBtn = screen.getByLabelText('close');

    fireEvent.click(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', async () => {
    const spy = jest.fn();
    render(<MockBanner testID={TEST_ID} onClose={spy} showDismiss />);
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
  it('can set dangerouslySetClassName', () => {
    const customClassName = css`
      padding: 5px;
    `;

    render(
      <Banner
        testID={TEST_ID}
        dangerouslySetClassName={customClassName}
        variant="warning"
        startIcon="cashUSD"
        title=""
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      padding: 5,
    });
  });

  it('can set dangerouslySetStyle', () => {
    const customClassName = {
      position: 'sticky',
    } as const;

    render(
      <Banner
        testID={TEST_ID}
        dangerouslySetStyle={customClassName}
        variant="warning"
        startIcon="cashUSD"
        title=""
      >
        Banner Content
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle(customClassName);
  });
});
