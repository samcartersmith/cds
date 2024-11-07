import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

describe('CheckboxGroup.test', () => {
  it('renders label and children', () => {
    render(
      <CheckboxGroup label="test label" onChange={jest.fn()} selectedValues={new Set('1')}>
        <div>test children</div>
        <div>test children2</div>
      </CheckboxGroup>,
    );

    expect(screen.getByText('test label')).toBeTruthy();
    expect(screen.getByText('test children')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    render(
      <CheckboxGroup onChange={onChange} selectedValues={new Set('1')} testID="test-group">
        <Checkbox id="item1" value="1">
          1
        </Checkbox>
        <Checkbox id="item2" value="2">
          2
        </Checkbox>
      </CheckboxGroup>,
    );

    fireEvent.click(screen.getByTestId('test-group-item1'));
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('test-group-item1'));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('logs warning if no ariaLabelledby is provided', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // suppress warning
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <CheckboxGroup onChange={onChange} selectedValues={new Set('1')}>
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">2</Checkbox>
      </CheckboxGroup>,
    );

    expect(console.warn).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });

  it('logs warning if checkbox has no value', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // suppress warning
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <CheckboxGroup label="test label" onChange={onChange} selectedValues={new Set('1')}>
        <Checkbox>1</Checkbox>
        <Checkbox value="2">2</Checkbox>
      </CheckboxGroup>,
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });
});
