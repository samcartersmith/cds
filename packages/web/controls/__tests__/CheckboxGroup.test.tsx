import { fireEvent, render } from '@testing-library/react';

import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

describe('CheckboxGroup.test', () => {
  it('renders label and children', () => {
    const { getByText } = render(
      <CheckboxGroup label="test label" selectedValues={new Set('1')} onChange={jest.fn()}>
        <div>test children</div>
        <div>test children2</div>
      </CheckboxGroup>,
    );

    expect(getByText('test label')).toBeTruthy();
    expect(getByText('test children')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <CheckboxGroup selectedValues={new Set('1')} onChange={onChange} testID="test-group">
        <Checkbox value="1" id="item1">
          1
        </Checkbox>
        <Checkbox value="2" id="item2">
          2
        </Checkbox>
      </CheckboxGroup>,
    );

    fireEvent.click(getByTestId('test-group-item1'));
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTestId('test-group-item1'));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('logs warning if no ariaLabelledby is provided', () => {
    process.env.NODE_ENV = 'development';

    const onChange = jest.fn();
    // suppress warning
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <CheckboxGroup selectedValues={new Set('1')} onChange={onChange}>
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
      <CheckboxGroup selectedValues={new Set('1')} onChange={onChange}>
        <Checkbox>1</Checkbox>
        <Checkbox value="2">2</Checkbox>
      </CheckboxGroup>,
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });
});
