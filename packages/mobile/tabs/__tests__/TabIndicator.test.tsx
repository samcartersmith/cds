import { RefObject } from 'react';
import { View } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';

import { TabIndicator } from '../TabIndicator';

describe('TabIndicator', () => {
  it('passes a11y', () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator x={0} width={100} testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('renders x and width', async () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator x={50} width={1000} background="secondary" testID={TEST_ID} />);
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
    render(<TabIndicator x={0} width={100} background="secondary" />);
    expect(screen.getByTestId('cds-tab-indicator-inner-bar')).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,1)',
    });
  });

  it('renders with testID', () => {
    const TEST_ID = 'tabIndicator';
    render(<TabIndicator x={0} width={100} testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });

  it('renders with ref', () => {
    const TEST_ID = 'tabIndicator';
    const ref = { current: undefined } as unknown as RefObject<View>;
    render(<TabIndicator x={0} width={100} testID={TEST_ID} ref={ref} />);
    expect(ref.current).toBeInstanceOf(View);
  });
});
