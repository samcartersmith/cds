import { act, fireEvent, render } from '@testing-library/react-native';

import { defaultPalette } from '@cbhq/cds-common';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';
import { ReactTestInstance } from 'react-test-renderer';
import { ProgressBar } from '../ProgressBar';
import { Box } from '../../layout';
import { paletteValueToRgbaString } from '../../utils/palette';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';

jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

jest.mock('react-native/Libraries/Animated/Animated', () => {
  return {
    ...jest.requireActual<Record<string, unknown>>('react-native/Libraries/Animated/Animated'),
    timing: (value: { setValue: (arg0: unknown) => void }, config: { toValue: unknown }) => {
      return {
        start: jest.fn((callback?: ({ finished }: { finished: boolean }) => void) => {
          value.setValue(config.toValue);
          callback?.({ finished: true });
        }),
      };
    },
  };
});

function fireTextEvent(floatLabel: ReactTestInstance) {
  void act(() => {
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
  });
}

function fireTextContainerEvent(floatLabelContainer: ReactTestInstance) {
  void act(() => {
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
  });
}

describe('ProgressBar test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('places bar label in correct position if it flows off the left container', async () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={0} progress={0}>
          <ProgressBar progress={0} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(getByTestId('cds-progress-bar-float-label-container'));

    expect(floatLabel).toHaveStyle({
      transform: [{}],
    });

    expect(getAllByText('0%')).toHaveLength(2);
  });

  it('places bar label in correct position in middle', () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={50} progress={0.5}>
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = getByTestId('cds-progress-bar-float-label');
    fireTextEvent(floatLabel);

    fireTextContainerEvent(getByTestId('cds-progress-bar-float-label-container'));

    expect(floatLabel).toHaveStyle({
      transform: [{ translateX: 90 }], // (200/2) -10
    });

    const floatLabelText = getAllByText('50%')[0];
    expect(floatLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foregroundMuted, 'light'),
    });
  });

  it('renders fixed labels in correct position', () => {
    const { getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFixedLabels startLabel={0} endLabel={50} labelPlacement="above">
          <ProgressBar progress={50} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const startLabelText = getAllByText('0%')[0];
    const endLabelText = getAllByText('50%')[0];

    expect(startLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(endLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
  });

  it('has correct bar width', () => {
    const { getByTestId } = render(
      <Box width="200">
        <ProgressBar progress={0.77} color="positive" />
      </Box>,
    );

    fireTextContainerEvent(getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = getByTestId('cds-progress-bar-inner-bar');
    expect(bar).toHaveStyle({
      backgroundColor: paletteValueToRgbaString(defaultPalette.positive, 'light'),
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });
  });

  it('has correct bar height', () => {
    const { getByTestId } = render(
      <Box width="200">
        <ProgressBar progress={0.77} weight="heavy" />
      </Box>,
    );

    fireTextContainerEvent(getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = getByTestId('cds-progress-bar-inner-bar-container');
    expect(bar).toHaveStyle({
      height: 12,
    });
  });

  it('handles disabled state correctly', () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFixedLabels startLabel={0} endLabel={77} disabled>
          <ProgressBar progress={0.77} disabled />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    fireTextContainerEvent(getByTestId('cds-progress-bar-inner-bar-container'));

    const bar = getByTestId('cds-progress-bar-inner-bar');
    const startLabelText = getAllByText('0%')[0];
    const endLabelText = getAllByText('77%')[0];

    expect(bar).toHaveStyle({
      backgroundColor: paletteValueToRgbaString(defaultPalette.lineHeavy, 'light'),
      transform: [{ translateX: -46 }], // -1 * (200 - (200 * 0.77))
    });

    expect(startLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
    expect(endLabelText).toHaveStyle({
      color: paletteValueToRgbaString(defaultPalette.foreground, 'light'),
    });
  });
});
