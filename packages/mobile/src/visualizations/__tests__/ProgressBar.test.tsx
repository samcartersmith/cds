import { act } from 'react';
import { ReactTestInstance } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { defaultPalette } from '@cbhq/cds-common';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';

import { Box } from '../../layout';
import { paletteValueToRgbaString } from '../../utils/palette';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

jest.useFakeTimers();

jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

function fireTextEvent(floatLabel: ReactTestInstance) {
  fireEvent(floatLabel, 'layout', {
    nativeEvent: {
      layout: {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        pageX: 0,
        pageY: 0,
      },
    },
  });
}

function fireTextContainerEvent(floatLabelContainer: ReactTestInstance) {
  fireEvent(floatLabelContainer, 'layout', {
    nativeEvent: {
      layout: {
        x: 0,
        y: 0,
        width: 200,
        height: 20,
        pageX: 0,
        pageY: 0,
      },
    },
  });
}

describe('ProgressBar test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('places bar label in correct position if it flows off the left container and passes a11y', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={0} progress={0} testID="mock-progress-bar">
          <ProgressBar progress={0} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = screen.getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-float-label-container'));

    expect(floatLabel).toHaveStyle({
      transform: [{ translateX: 0 }],
    });

    expect(screen.getAllByText('0%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('places bar label in correct position in middle', () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={50} progress={0.5} testID="mock-progress-bar">
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = screen.getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-float-label-container'));

    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(floatLabel).toHaveStyle({
      transform: [{ translateX: 90 }], // (200/2) -10
    });

    const floatLabelText = screen.getAllByText('50%')[0];
    expect(floatLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foregroundMuted, 'light'),
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('renders fixed labels in correct position', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels
          endLabel={50}
          labelPlacement="above"
          startLabel={0}
          testID="mock-progress-bar"
        >
          <ProgressBar progress={50} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('50%')[0];

    expect(startLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(endLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('has correct bar width', () => {
    render(
      <Box width="200">
        <ProgressBar color="positive" progress={0.77} testID="mock-progress-bar" />
      </Box>,
    );

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = screen.getByTestId('cds-progress-bar-inner-bar');
    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(bar).toHaveStyle({
      backgroundColor: paletteValueToRgbaString(defaultPalette.positive, 'light'),
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('has correct bar height', () => {
    render(
      <Box width="200">
        <ProgressBar progress={0.77} testID="mock-progress-bar" weight="heavy" />
      </Box>,
    );

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = screen.getByTestId('cds-progress-bar-inner-bar-container');
    expect(bar).toHaveStyle({
      height: 12,
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('handles disabled state for just ProgressBar correctly & passes a11y', () => {
    render(
      <Box width="200">
        <ProgressBar disabled progress={0.77} testID="mock-progress-bar" />
      </Box>,
    );
    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = screen.getByTestId('cds-progress-bar-inner-bar');

    // necessary for Animated.timing delay
    act(() => void jest.runAllTimers());
    expect(bar).toHaveStyle({
      backgroundColor: paletteValueToRgbaString(defaultPalette.lineHeavy, 'light'),
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });

    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });

  it('handles disabled state correctly for fixed labels', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels
          disabled
          endLabel={77}
          startLabel={0}
          testID="mock-progress-bar"
        >
          <ProgressBar progress={0.77} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    fireTextContainerEvent(screen.getByTestId('cds-progress-bar-inner-bar-container'));

    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('77%')[0];

    expect(startLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(endLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(screen.getByTestId('mock-progress-bar')).toBeAccessible();
  });
});
