import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons/Icon';
import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-color-test';
const INNER_CONTAINER_TESTID = 'dotstatuscolor-inner-container';

describe('DotStatusColor', () => {
  it('renders a DotStatusColor', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('passes a11y for negative variant', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeAccessible();
  });

  it('can change variant to negative', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSTATUSCOLOR_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: 12, width: 12 } },
    });
  });

  it('passes a11y for positive variant', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="positive" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeAccessible();
  });

  it('can change variant to positive', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="positive" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSTATUSCOLOR_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: 12, width: 12 } },
    });
  });

  it('passes a11y for small size', () => {
    render(<DotStatusColor size="s" testID={DOTSTATUSCOLOR_TESTID} variant="positive" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeAccessible();
  });

  it('can change size to small', () => {
    const iconSize = 12;

    render(<DotStatusColor size="s" testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSTATUSCOLOR_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      width: iconSize,
      height: iconSize,
    });
  });

  it('passes a11y for DotStatusColor that has a children', () => {
    render(
      <DotStatusColor pin="bottom-start" testID={DOTSTATUSCOLOR_TESTID} variant="negative">
        <Icon name="airdrop" size="l" />
      </DotStatusColor>,
    );

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeAccessible();
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = 24;
    const dotSize = 16;

    render(
      <DotStatusColor pin="bottom-start" testID={DOTSTATUSCOLOR_TESTID} variant="negative">
        <Icon name="airdrop" size="l" />
      </DotStatusColor>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSTATUSCOLOR_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      position: 'absolute',
      transform: [
        {
          translateX: -(dotSize / 2),
        },
        {
          translateY: iconSize - dotSize / 2,
        },
      ],
    });
  });
});
