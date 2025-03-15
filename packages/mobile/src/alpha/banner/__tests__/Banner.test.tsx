import React from 'react';
import { View } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { stringify } from 'querystring';
import { InternalSpacingProps } from '@cbhq/cds-common/types/SpacingProps';

import { useInternalSpacingStyles } from '../../../hooks/internal/useInternalSpacingStyles';
import { Link, TextBody } from '../../../typography';
import { Banner, MobileBannerProps } from '../Banner';

const TEST_ID = 'test-banner';

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  variant = 'warning',
  testID = TEST_ID,
  ...props
}: Partial<MobileBannerProps>) => (
  <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
    <TextBody>Banner content</TextBody>
  </Banner>
);

const action = <Link to="https://www.coinbase.com">Link</Link>;

const checkSpacing = ({
  testID,
  withAction = true,
  styleVariant,
  ...spacings
}: {
  testID: string;
  withAction?: boolean;
} & InternalSpacingProps &
  Pick<MobileBannerProps, 'styleVariant'>) => {
  it(`${testID} has correct spacings ${stringify(spacings as never, ', ')}`, () => {
    render(
      <MockBanner primaryAction={withAction ? action : undefined} styleVariant={styleVariant} />,
    );
    // The above is the spacing that the test requires
    // Root Container has a start spacing of 2
    const { result } = renderHook(() => useInternalSpacingStyles(spacings));

    expect(screen.queryByTestId(testID)).toHaveStyle(result.current as Record<string, unknown>);
  });
};

describe('Banner', () => {
  it('renders a Banner', () => {
    render(<MockBanner />);

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('inner-end-box should be an VStack', () => {
    render(<MockBanner />);

    const innerEndBox = screen.getByTestId(`${TEST_ID}-inner-end-box`);

    expect(innerEndBox).toHaveStyle({
      flexDirection: 'column',
    });
  });
});

describe('Banner actions', () => {
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dimiss-btn`);

    fireEvent.press(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dimiss-btn`);

    // Before dismiss is pressed, banner should be visible
    expect(screen.UNSAFE_getByProps({ collapsed: false })).toBeTruthy();

    fireEvent.press(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    expect(screen.UNSAFE_getByProps({ collapsed: true })).toBeTruthy();
  });

  it('Banner forwardRef works as expected', () => {
    const ref = React.createRef<View>();
    render(
      <Banner ref={ref} startIcon="cashUSD" testID={TEST_ID} title="Banner title" variant="warning">
        <TextBody>Content</TextBody>
      </Banner>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  checkSpacing({
    testID: TEST_ID,
    start: 2,
    bottom: 2,
  });
});
