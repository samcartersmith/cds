import { render } from '@testing-library/react-native';
import { ChartTimeseries } from '@cbhq/cds-common';

import { SparklineInteractiveTimeseriesPaths } from '../SparklineInteractiveTimeseriesPaths';

describe('SparklineInteractiveTimeseriesPaths.test', () => {
  it('renders', () => {
    const onRender = jest.fn();

    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const data: ChartTimeseries[] = [
      {
        points: [{ value: 48994.25, date: new Date() }],
        id: '1',
        strokeColor: 'red',
      },
    ];

    render(
      <SparklineInteractiveTimeseriesPaths
        data={data}
        initialPath=""
        width={300}
        height={100}
        onRender={onRender}
      />,
    );

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});
