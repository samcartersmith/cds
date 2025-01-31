import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { useDimensions } from '../../hooks/useDimensions';
import { galaxyScreenDimensions as narrowScreenDimensions } from '../../overlays/tooltip/__tests__/UseTooltipPositionTestData';
import { defaultTheme } from '../../themes/defaultTheme';
import { TextBody } from '../../typography';
import { DefaultThemeProvider } from '../../utils/testHelpers';
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

jest.mock('../../hooks/useDimensions');
const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

describe('Banner testing with wide screen configurations (screen size >= 724)', () => {
  beforeEach(() => {
    mockUseDimensions(wideScreenDimensions);
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders a Banner on wide screen', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('Banner borderRadius={0} and bordered={false} has correct visuals', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner borderRadius={0} bordered={false} />
      </DefaultThemeProvider>,
    );
    const rootContainer = screen.getByTestId(TEST_ID);

    expect(rootContainer).not.toHaveStyle({
      borderWidth: 1,
    });

    expect(rootContainer).toHaveStyle({
      borderRadius: 0,
    });
  });

  it('Banner bordered=true has correct visuals', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner bordered borderRadius={0} />
      </DefaultThemeProvider>,
    );
    const rootContainer = screen.getByTestId(TEST_ID);

    expect(rootContainer).toHaveStyle({
      borderWidth: 1,
      borderRadius: 0,
    });
  });

  it('inner-end-box should be an HStack', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner />
      </DefaultThemeProvider>,
    );

    const innerEndBox = screen.getByTestId(`${TEST_ID}-inner-end-box`);

    expect(innerEndBox).toHaveStyle({
      flexDirection: 'row',
    });
  });

  it('can set style', () => {
    const bannerCustomStyle = {
      paddingTop: 40,
    };

    render(
      <DefaultThemeProvider>
        <MockBanner style={bannerCustomStyle} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle(bannerCustomStyle);
  });

  it('renders error banner correctly on light mode', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner variant="error" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgb(255,242,178)' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'rgb(237,112,47)' });
  });

  it('renders error banner correctly on dark mode', () => {
    render(
      <DefaultThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <MockBanner variant="error" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle({ backgroundColor: 'rgb(65,27,0)' });
    expect(screen.getByRole('image')).toHaveStyle({ color: 'rgb(248,150,86)' });
  });
});

describe('Banner testing with narrow screen configurations (screen size < 724)', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('renders a Banner on narrow screen', () => {
    render(
      <DefaultThemeProvider>
        <MockBanner />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });
});

describe('Banner actions', () => {
  beforeEach(() => {
    mockUseDimensions(narrowScreenDimensions);
  });

  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockBanner showDismiss onClose={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    const dismissBtn = screen.getByLabelText('close');

    fireEvent.press(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockBanner showDismiss onClose={spy} />
      </DefaultThemeProvider>,
    );

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
      <DefaultThemeProvider>
        <Banner
          ref={ref}
          startIcon="cashUSD"
          testID={TEST_ID}
          title="Banner title"
          variant="warning"
        >
          <TextBody>Content</TextBody>
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });
});
