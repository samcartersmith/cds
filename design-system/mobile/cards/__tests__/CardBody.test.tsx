import { render } from '@testing-library/react-native';

import { CardBody } from '..';

describe('CardBody', () => {
  it('renders vertical stack', () => {
    const result = render(<CardBody orientation="vertical" testID="card-body" />);
    expect(result.getByTestId('card-body-vertical')).toBeTruthy();
  });

  it('renders horizontal stack', () => {
    const result = render(<CardBody orientation="horizontal" testID="card-body" />);
    expect(result.getByTestId('card-body-horizontal')).toBeTruthy();
  });
});
