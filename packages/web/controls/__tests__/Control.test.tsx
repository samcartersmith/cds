import { fireEvent, render } from '@testing-library/react';

import { Control } from '../Control';

describe('Control', () => {
  it('renders label and children', () => {
    const { getByText } = render(
      <Control label="test label" readOnly>
        <div>test children</div>
      </Control>,
    );

    expect(getByText('test label')).toBeTruthy();
    expect(getByText('test children')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Control label="test label" type="checkbox" onChange={onChange} testID="test-control">
        <div />
      </Control>,
    );

    fireEvent.click(getByTestId('test-control'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('logs warning if no ariaLabelledby is provided', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // suppress warning
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    // @ts-expect-error Test falsy children to trigger console warning
    render(<Control label="test label" type="checkbox" onChange={onChange} />);

    expect(console.warn).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });
});
