import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { defaultPalette } from '@cbhq/cds-common';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';

import { paletteValueToRgbaString } from '../../utils/palette';
import { ProgressCircle } from '../ProgressCircle';

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
    createAnimatedComponent: (c: React.ComponentType<unknown>) => c,
  };
});

jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));

describe('ProgressCircle tests', () => {
  it('handles 0 percent', () => {
    const size = 100;
    const { getByTestId, getAllByText } = render(<ProgressCircle progress={0} size={size} />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    // eslint-disable-next-line no-underscore-dangle
    expect(innerCircle.props.strokeDashoffset._value).toEqual(circumference);

    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(getAllByText('0%')).toHaveLength(2);
  });

  it('handles 50 percent', () => {
    const size = 100;
    const { getByTestId, getAllByText } = render(<ProgressCircle progress={0.5} size={size} />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    // eslint-disable-next-line no-underscore-dangle
    expect(innerCircle.props.strokeDashoffset._value).toEqual(circumference * 0.5);

    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(getAllByText('50%')).toHaveLength(2);
  });

  it('handles 100 percent', () => {
    const size = 100;
    const { getByTestId, getAllByText } = render(<ProgressCircle progress={1} size={size} />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    // eslint-disable-next-line no-underscore-dangle
    expect(innerCircle.props.strokeDashoffset._value).toBe(0);

    expect(innerCircle.props.strokeDasharray).toEqual(circumference);

    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.primary, 'light'),
    );

    expect(getAllByText('100%')).toHaveLength(2);
  });

  it('handles heavy weight', () => {
    const size = 100;
    const { getByTestId } = render(<ProgressCircle progress={1} weight="heavy" size={size} />);

    const innerCircle = getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle.props.strokeWidth).toBe(12);
  });

  it('handles no text', () => {
    const size = 100;
    const { queryAllByText } = render(<ProgressCircle progress={1} hideText size={size} />);

    expect(queryAllByText('100%')).toHaveLength(0);
  });

  it('handles different color', () => {
    const size = 100;
    const { getByTestId } = render(<ProgressCircle color="positive" progress={1} size={size} />);

    const innerCircle = getByTestId('cds-progress-circle-inner');
    expect(innerCircle.props.stroke).toEqual(
      paletteValueToRgbaString(defaultPalette.positive, 'light'),
    );
  });
});
