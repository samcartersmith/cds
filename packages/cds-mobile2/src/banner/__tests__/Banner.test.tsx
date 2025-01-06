import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { useDimensions } from '../../hooks/useDimensions';
import { galaxyScreenDimensions as narrowScreenDimensions } from '../../overlays/Tooltip/__tests__/UseTooltipPositionTestData';
import { ThemeProvider } from '../../system';
import { darkTheme } from '../../themes/dark';
import { Link, TextBody } from '../../typography';
import { Banner, BannerProps } from '../Banner';

const TEST_ID = 'test-banner';

const wideScreenDimensions: ReturnType<typeof useDimensions> = {
  screenHeight: 779.3777777777777,
  screenWidth: 730,
  statusBarHeight: 25.955554962158203,
};

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  variant = 'warning',
  testID = TEST_ID,
  ...props
}: Partial<BannerProps>) => (
  <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
    <TextBody>Banner content</TextBody>
  </Banner>
);

const action = <Link to="https://www.coinbase.com">Link</Link>;

jest.mock('../../hooks/useDimensions');
const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

describe('Banner testing with wide screen configurations (screen size >= 724)', () => {
  beforeEach(() => {
    mockUseDimensions(wideScreenDimensions);
  });

  it('passes a11y', () => {
    render(<MockBanner />);

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a Banner on wide screen', () => {
    render(<MockBanner />);

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('Banner bordered={false} borderRadius={0} has correct visuals', () => {
    render(<MockBanner borderRadius={0} bordered={false} />);

    const rootContainer = screen.getByTestId(TEST_ID);

    expect(rootContainer).toHaveStyle({
      borderWidth: 0,
    });
  });

  it('inner-end-box should be an HStack', () => {
    render(<MockBanner />);

    const innerEndBox = screen.getByTestId(`${TEST_ID}-inner-end-box`);

    expect(innerEndBox).toHaveStyle({
      flexDirection: 'row',
    });
  });

  it('can set style', () => {
    const bannerCustomStyle = {
      paddingTop: 40,
    };

    render(<MockBanner style={bannerCustomStyle} />);

    expect(screen.getByTestId(TEST_ID)).toHaveStyle(bannerCustomStyle);
  });

  it('renders error banner correctly on light mode', () => {
    render(<MockBanner variant="error" />);

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(255,242,178,1)' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'rgba(237,112,47,1)' });
  });

  it('renders error banner correctly on dark mode', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <MockBanner variant="error" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(65,27,0,1)' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'rgba(248,150,86,1)' });
  });
});

describe('Banner testing with narrow screen configurations (screen size < 724)', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('renders a Banner on narrow screen', () => {
    render(<MockBanner />);

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });
});

describe('Banner actions', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByLabelText('close');

    fireEvent.press(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} />);

    const dismissBtn = screen.getByLabelText('close');

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
});
