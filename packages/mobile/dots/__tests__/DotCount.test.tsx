import { fireEvent, render, screen } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common';
import { borderWidth } from '@cbhq/cds-common/tokens/borderWidth';

import { Icon } from '../../icons/Icon';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { ThemeProvider } from '../../system/ThemeProvider';
import { paletteAliasToRgbaString } from '../../utils/palette';
import { DotCount } from '../DotCount';

const DOTCOUNT_TESTID = 'dot-count-test';

describe('DotCount', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('passes a11y for single digit counter', () => {
    render(<DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  it('renders a DotCount', () => {
    render(<DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders a secondary border in light mode', () => {
    render(<DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'light'),
      borderWidth: borderWidth.button,
    });
  });

  it('renders a secondary border in dark mode', () => {
    render(
      <ThemeProvider name="dotcount-theme-provider" spectrum="dark">
        <DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />
      </ThemeProvider>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'dark', false),
      borderWidth: borderWidth.button,
    });
  });

  it('renders a secondary border in dark and frontier mode', () => {
    render(
      <FeatureFlagProvider frontier>
        <ThemeProvider name="dotcount-theme-provider" spectrum="dark">
          <DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />
        </ThemeProvider>
      </FeatureFlagProvider>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'dark', true),
      borderWidth: borderWidth.button,
    });
  });

  it('renders correct count when count equals 1', () => {
    render(<DotCount count={1} testID={DOTCOUNT_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    render(<DotCount count={0} testID={DOTCOUNT_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.queryByText('0')).toBeNull();
  });

  it('passes a11y for 0 counter', () => {
    render(<DotCount count={0} testID={DOTCOUNT_TESTID} variant="negative" />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  it('renders count 99+ when count > 99', () => {
    render(<DotCount count={120} testID={DOTCOUNT_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: normalScaleMap.s, width: normalScaleMap.s } },
    });

    expect(screen.getByText('99+')).toBeTruthy();
  });

  it('passes a11y for double or more digit counter', () => {
    render(<DotCount count={120} testID={DOTCOUNT_TESTID} variant="negative" />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  // This test breaks with Reanimated V3 due to a bug with the V3 Plugin
  // Once this issue is resolved, we should bump reanimated & remove the jest.mock in jest/setup.js.
  // https://github.com/software-mansion/react-native-reanimated/pull/4136
  it.todo('DotCount is placed in the correct position relative to its children'); // , async () => {
  //   const iconSize = normalScaleMap.l;
  //   const dotSize = 24;

  //   render(
  //     <DotCount pin="top-end" testID={DOTCOUNT_TESTID} variant="negative" count={2}>
  //       <Icon name="airdrop" size="l" />
  //     </DotCount>,
  //   );

  //   // Trigger onLayout for the icon
  //   fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
  //     nativeEvent: { layout: { height: iconSize, width: iconSize } },
  //   });

  //   // Trigger onLayout for the dot
  //   fireEvent(screen.getByTestId('dotcount-inner-container'), 'layout', {
  //     nativeEvent: { layout: { height: dotSize, width: dotSize } },
  //   });

  //   // initial styles
  //   expect(screen.getByTestId('dotcount-inner-container')).toHaveAnimatedStyle({
  //     position: 'absolute',
  //     transform: [
  //       { scale: 0.9 },
  //       {
  //         translateX: 0,
  //       },
  //       {
  //         translateY: 0,
  //       },
  //     ],
  //   });

  //   act(() => {
  //     jest.advanceTimersByTime(200);

  //     // styles after animation
  //     expect(screen.getByTestId('dotcount-inner-container')).toHaveAnimatedStyle({
  //       position: 'absolute',
  //       transform: [
  //         { scale: 1 },
  //         {
  //           translateX: iconSize - dotSize / 2,
  //         },
  //         {
  //           translateY: -(dotSize / 2),
  //         },
  //       ],
  //     });
  //   });
  // });

  it('passes a11y when dot is placed relative to its parent', () => {
    render(
      <DotCount count={1} pin="top-end" testID={DOTCOUNT_TESTID} variant="negative">
        <Icon name="airdrop" size="l" />
      </DotCount>,
    );

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });
});
