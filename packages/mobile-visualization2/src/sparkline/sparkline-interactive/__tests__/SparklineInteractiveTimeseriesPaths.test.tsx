import { render } from '@testing-library/react-native';
import { ChartTimeseries } from '@cbhq/cds-common2';
import { DefaultThemeProvider } from '@cbhq/cds-mobile2/utils/testHelpers';

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
      <DefaultThemeProvider>
        <SparklineInteractiveTimeseriesPaths
          data={data}
          height={100}
          initialPath=""
          onRender={onRender}
          width={300}
        />
      </DefaultThemeProvider>,
    );

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});
