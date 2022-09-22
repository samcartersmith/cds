import { render } from '@testing-library/react-native';

import { SparklineInteractiveTimeseriesPaths } from '../SparklineInteractiveTimeseriesPaths';

describe('SparklineInteractiveTimeseriesPaths.test', () => {
  it('renders', () => {
    const onRender = jest.fn();

    render(
      <SparklineInteractiveTimeseriesPaths
        data={[{ points: [{ value: 48994.25, date: new Date() }], id: '1', strokeColor: 'red' }]}
        initialPath=""
        width={300}
        height={100}
        onRender={onRender}
      />,
    );

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});
