import { fireEvent, render, screen } from '@testing-library/react';

import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('renders label', () => {
    render(
      <Switch onChange={jest.fn()} checked>
        test label
      </Switch>,
    );

    expect(screen.getByText('test label')).toBeTruthy();
  });

  it('renders without label', () => {
    render(<Switch onChange={jest.fn()} />);

    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();
    render(
      <Switch onChange={onChange} checked>
        test label
      </Switch>,
    );

    fireEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
