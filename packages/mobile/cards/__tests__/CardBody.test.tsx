import { render, screen } from '@testing-library/react-native';

import { CardBody } from '..';

describe('CardBody', () => {
  it('renders vertical stack', () => {
    render(<CardBody orientation="vertical" testID="card-body" />);
    expect(screen.getByTestId('card-body-vertical')).toBeTruthy();
  });

  it('renders horizontal stack', () => {
    render(<CardBody orientation="horizontal" testID="card-body" />);
    expect(screen.getByTestId('card-body-horizontal')).toBeTruthy();
  });
});
