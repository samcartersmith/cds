import React from 'react';
import { View } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react-native';
import { stringify } from 'querystring';
import { BannerBaseProps } from '@cbhq/cds-common';
import { InternalSpacingProps } from '@cbhq/cds-common/types/SpacingProps';

import { useInternalSpacingStyles } from '../../hooks/internal/useInternalSpacingStyles';
import { useDimensions } from '../../hooks/useDimensions';
import { galaxyScreenDimensions as narrowScreenDimensions } from '../../overlays/Tooltip/__tests__/UseTooltipPositionTestData';
import { Link, TextBody } from '../../typography';
import { Banner } from '../Banner';

const TEST_ID = 'test-banner';

const wideScreenDimensions: ReturnType<typeof useDimensions> = {
  screenHeight: 779.3777777777777,
  screenWidth: 730,
  statusBarHeight: 25.955554962158203,
};

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  tone = 'warning',
  testID = TEST_ID,
  ...props
}: Partial<BannerBaseProps>) => (
  <Banner title={title} startIcon={startIcon} tone={tone} testID={testID} {...props}>
    <TextBody>Banner content</TextBody>
  </Banner>
);

const action = <Link to="https://www.coinbase.com">Link</Link>;

jest.mock('../../hooks/useDimensions');
const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

const checkSpacing = ({
  testID,
  withAction = true,
  customStyle,
  ...spacings
}: {
  testID: string;
  withAction?: boolean;
  customStyle?: Record<string, unknown>;
} & InternalSpacingProps) => {
  // eslint-disable-next-line jest/require-top-level-describe
  it(`${testID} has correct spacings ${stringify(spacings as never, ', ')}`, () => {
    const { queryByTestId } = render(<MockBanner action={withAction ? action : undefined} />);
    // The above is the spacing that the test requires
    // Root Container has a start spacing of 2
    const { result } = renderHook(() => useInternalSpacingStyles(spacings));

    expect(queryByTestId(testID)).toHaveStyle(
      customStyle ?? (result.current as Record<string, unknown>),
    );
  });
};

describe('Banner testing with wide screen configurations (screen size >= 724)', () => {
  beforeEach(() => {
    mockUseDimensions(wideScreenDimensions);
  });

  it('renders a Banner on wide screen', () => {
    const { queryByTestId } = render(<MockBanner />);

    expect(queryByTestId(TEST_ID)).toBeTruthy();
  });

  it('Banner bordered={false} borderRadius="none" has correct visuals', () => {
    const { getByTestId } = render(<MockBanner bordered={false} borderRadius="roundedNone" />);

    const rootContainer = getByTestId(TEST_ID);

    expect(rootContainer).toHaveStyle({
      borderWidth: 0,
    });
  });

  it('inner-end-box should be an HStack', () => {
    const { getByTestId } = render(<MockBanner />);

    const innerEndBox = getByTestId(`${TEST_ID}-inner-end-box`);

    expect(innerEndBox).toHaveStyle({
      flexDirection: 'row',
    });
  });

  checkSpacing({
    testID: TEST_ID,
    start: 2,
    bottom: 2,
  });

  checkSpacing({
    testID: `${TEST_ID}-icon`,
    customStyle: { paddingTop: 2 },
  });

  checkSpacing({
    testID: `${TEST_ID}-action`,
    top: 1,
  });
});

describe('Banner testing with narrow screen configurations (screen size < 724)', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('renders a Banner on narrow screen', () => {
    const { queryByTestId } = render(<MockBanner />);

    expect(queryByTestId(TEST_ID)).toBeTruthy();
  });

  checkSpacing({
    testID: TEST_ID,
    start: 2,
    bottom: 2,
  });

  checkSpacing({
    testID: `${TEST_ID}-icon`,
    customStyle: {
      paddingTop: 2,
    },
  });

  checkSpacing({
    testID: `${TEST_ID}-action`,
    top: 1,
  });
});

describe('Banner actions', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    const { getByLabelText } = render(<MockBanner testID={TEST_ID} onClose={spy} showDismiss />);

    const dismissBtn = getByLabelText('close');

    fireEvent.press(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    const result = render(<MockBanner onClose={spy} showDismiss />);

    const dismissBtn = result.getByLabelText('close');

    // Before dismiss is pressed, banner should be visible
    expect(result.UNSAFE_getByProps({ collapsed: false })).toBeTruthy();

    fireEvent.press(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    expect(result.UNSAFE_getByProps({ collapsed: true })).toBeTruthy();
  });

  it('Banner forwardRef works as expected', () => {
    const ref = React.createRef<View>();
    const { getByTestId } = render(
      <Banner ref={ref} tone="warning" testID={TEST_ID} startIcon="cashUSD" title="Banner title">
        <TextBody>Content</TextBody>
      </Banner>,
    );

    expect(getByTestId(TEST_ID)).toBeTruthy();
  });

  checkSpacing({
    testID: TEST_ID,
    start: 2,
    bottom: 2,
  });
});
