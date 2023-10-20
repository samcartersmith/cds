/* eslint-disable react-perf/jsx-no-new-function-as-prop, react-perf/jsx-no-new-object-as-prop */
import { ChangeEventHandler, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Switch } from '../Switch';

describe('Switch.test', () => {
  it('handles input', () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);
      const onChange: ChangeEventHandler<HTMLInputElement> = (event) =>
        setChecked(event.target.checked);
      return (
        <div>
          <div>checked is {checked ? 'true' : 'false'}</div>
          <Switch checked={checked} onChange={onChange}>
            test label
          </Switch>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('checked is false')).toBeTruthy();

    fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('checked is true')).toBeTruthy();

    fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('checked is false')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<Switch onChange={jest.fn()}>test label</Switch>)).toHaveNoViolations();
  });

  it('renders label', () => {
    render(<Switch onChange={jest.fn()}>test label</Switch>);

    expect(screen.getByLabelText('test label')).toBeTruthy();
  });

  it('disables user interaction when disabled', () => {
    const onChange = jest.fn();

    render(<Switch disabled onChange={onChange} />);

    // dispatching event doesn't respect disabled inputs
    // so we use click method directly
    screen.getByRole('switch').click();

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };

    render(<Switch ref={ref} onChange={jest.fn()} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders testID', () => {
    render(<Switch onChange={jest.fn()} testID="test-test-id" />);

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });
});
