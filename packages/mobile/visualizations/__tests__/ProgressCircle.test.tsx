import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { defaultPalette } from '@cbhq/cds-common';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';

import { paletteValueToRgbaString } from '../../utils/palette';
import { ProgressCircle } from '../ProgressCircle';

jest.useFakeTimers();

const MockView = View;
jest.mock('react-native-svg', () => {
  return {
    ...jest.requireActual<Record<string, unknown>>('react-native-svg'),
    __esModule: true,

    // we have to mock Circle because it doesn't support testID
    Circle: (props: Record<string, unknown>) => {
      return <MockView {...props} />;
    },
  };
});

jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

describe('ProgressCircle tests and passes a11y', () => {
  it('handles 0 percent', () => {
    const size = 100;
    render(<ProgressCircle progress={0} size={size} testID="mock-progress-circle" />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();

    // necessary for Animated.timing delay
    jest.runAllTimers();
    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(screen.getAllByText('0%')).toHaveLength(2);

    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles 50 percent', () => {
    const size = 100;
    render(<ProgressCircle progress={0.5} size={size} testID="mock-progress-circle" />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();

    // necessary for Animated.timing delay
    jest.runAllTimers();

    // eslint-disable-next-line no-underscore-dangle
    expect(innerCircle.props.strokeDashoffset._value).toEqual(circumference * 0.5);
    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(screen.getAllByText('50%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles 100 percent', () => {
    const size = 100;
    render(<ProgressCircle progress={1} size={size} testID="mock-progress-circle" />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    // necessary for Animated.timing delay
    jest.runAllTimers();

    // eslint-disable-next-line no-underscore-dangle
    expect(innerCircle.props.strokeDashoffset._value).toBe(0);

    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(screen.getAllByText('100%')).toHaveLength(2);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles heavy weight', () => {
    const size = 100;
    render(
      <ProgressCircle progress={1} size={size} testID="mock-progress-circle" weight="heavy" />,
    );

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle.props.strokeWidth).toBe(12);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles no text', () => {
    const size = 100;
    render(<ProgressCircle hideText progress={1} size={size} testID="mock-progress-circle" />);

    expect(screen.queryAllByText('100%')).toHaveLength(0);
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });

  it('handles different color', () => {
    const size = 100;
    render(
      <ProgressCircle color="positive" progress={1} size={size} testID="mock-progress-circle" />,
    );

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.positive, 'light'),
    );
    expect(screen.getByTestId('mock-progress-circle')).toBeAccessible();
  });
});
