import { fireEvent, render, screen } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { borderWidth } from '@cbhq/cds-common/tokens/border';

import { Icon } from '../../icons/Icon';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { ThemeProvider } from '../../system/ThemeProvider';
import { paletteAliasToRgbaString } from '../../utils/palette';
import { DotCount } from '../DotCount';

const DOTCOUNT_TESTID = 'dot-count-test';

describe('DotCount', () => {
  it('passes a11y for single digit counter', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  it('renders a DotCount', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />);

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders a secondary border in light mode', () => {
    render(<DotCount variant="negative" count={1} />);

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'light'),
      borderWidth: borderWidth.button,
    });
  });

  it('renders a secondary border in dark mode', () => {
    render(
      <ThemeProvider spectrum="dark" name="dotcount-theme-provider">
        <DotCount variant="negative" count={1} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'dark', false),
      borderWidth: borderWidth.button,
    });
  });

  it('renders a secondary border in dark and frontier mode', () => {
    render(
      <FeatureFlagProvider frontier>
        <ThemeProvider spectrum="dark" name="dotcount-theme-provider">
          <DotCount variant="negative" count={1} />
        </ThemeProvider>
      </FeatureFlagProvider>,
    );

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      borderColor: paletteAliasToRgbaString('secondary', 'dark', true),
      borderWidth: borderWidth.button,
    });
  });

  it('renders correct count when count equals 1', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />);

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    render(<DotCount variant="negative" count={0} />);

    expect(screen.queryByText('0')).toBeNull();
  });

  it('passes a11y for 0 counter', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={0} />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  it('renders count 99+ when count > 99', () => {
    render(<DotCount variant="negative" count={120} />);

    expect(screen.getByText('99+')).toBeTruthy();
  });

  it('passes a11y for double or more digit counter', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={120} />);
    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });

  it('DotCount is placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 24;

    render(
      <DotCount pin="top-end" testID={DOTCOUNT_TESTID} variant="negative" count={1}>
        <Icon name="airdrop" size="l" />
      </DotCount>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTCOUNT_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    // Trigger onLayout for the dot
    fireEvent(screen.getByTestId('dotcount-inner-container'), 'layout', {
      nativeEvent: { layout: { height: dotSize, width: dotSize } },
    });

    expect(screen.getByTestId('dotcount-inner-container')).toHaveStyle({
      position: 'absolute',
      transform: [
        {
          translateX: iconSize - dotSize / 2,
        },
        {
          translateY: -(dotSize / 2),
        },
      ],
    });
  });

  it('passes a11y when dot is placed relative to its parent', () => {
    render(
      <DotCount pin="top-end" testID={DOTCOUNT_TESTID} variant="negative" count={1}>
        <Icon name="airdrop" size="l" />
      </DotCount>,
    );

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeAccessible();
  });
});
