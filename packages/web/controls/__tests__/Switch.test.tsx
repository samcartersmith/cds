import { fireEvent, render } from '@testing-library/react';

import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('renders label', () => {
    const { getByText } = render(
      <Switch onChange={jest.fn()} checked>
        test label
      </Switch>,
    );

    expect(getByText('test label')).toBeTruthy();
  });

  it('renders without label', () => {
    const { getByRole } = render(<Switch onChange={jest.fn()} />);

    expect(getByRole('switch')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Switch onChange={onChange} checked>
        test label
      </Switch>,
    );

    fireEvent.click(getByRole('switch'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
