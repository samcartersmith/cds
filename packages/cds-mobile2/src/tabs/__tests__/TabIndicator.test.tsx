import { View } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { TabIndicator } from '../TabIndicator';

describe('TabIndicator', () => {
  it('passes a11y', () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator testID={TEST_ID} width={100} x={0} />);
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders x and width', async () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator background="backgroundSecondary" testID={TEST_ID} width={1000} x={50} />);
    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID).props.style.transform[0].translateX).toBeGreaterThan(0),
    );
    expect(screen.getByTestId(TEST_ID)).toHaveStyle({
      transform: [{ translateX: 50 }],
    });
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle({
      transform: [{ translateX: 1000 }],
    });
  });

  it('renders background', () => {
    render(<TabIndicator background="backgroundSecondary" width={100} x={0} />);
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle({
      backgroundColor: 'rgba(238,240,243,1)',
    });
  });

  it('renders with testID', () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator testID={TEST_ID} width={100} x={0} />);
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('renders with ref', () => {
    const TEST_ID = 'tabIndicator';
    const ref = { current: undefined } as unknown as React.RefObject<View>;
    render(<TabIndicator ref={ref} testID={TEST_ID} width={100} x={0} />);
    expect(ref.current).toBeInstanceOf(View);
  });
});
