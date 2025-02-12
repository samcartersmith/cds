import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

const testStyle = { display: 'grid', gap: '16px' };
const testClass = 'test-class';
const testLabel = 'test label';

describe('CheckboxGroup.test', () => {
  it('renders label and children', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxGroup label="test label" onChange={jest.fn()} selectedValues={new Set('1')}>
          <div>test children</div>
          <div>test children2</div>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(testLabel)).toBeTruthy();
    expect(screen.getByText('test children')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    render(
      <DefaultThemeProvider>
        <CheckboxGroup onChange={onChange} selectedValues={new Set('1')} testID="test-group">
          <Checkbox id="item1" value="1">
            1
          </Checkbox>
          <Checkbox id="item2" value="2">
            2
          </Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
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
      <DefaultThemeProvider>
        <CheckboxGroup onChange={onChange} selectedValues={new Set('1')}>
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
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
      <DefaultThemeProvider>
        <CheckboxGroup label="test label" onChange={onChange} selectedValues={new Set('1')}>
          <Checkbox>1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(console.error).toHaveBeenCalledTimes(1);
    process.env.NODE_ENV = 'test';
  });

  it('applies className to fieldset', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxGroup
          className={testClass}
          label={testLabel}
          onChange={jest.fn()}
          selectedValues={new Set('1')}
        >
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(testLabel)).toHaveClass(testClass);
  });
  it('applies style to fieldset', () => {
    render(
      <DefaultThemeProvider>
        <CheckboxGroup
          label={testLabel}
          onChange={jest.fn()}
          selectedValues={new Set('1')}
          style={testStyle}
        >
          <Checkbox value="1">1</Checkbox>
          <Checkbox value="2">2</Checkbox>
        </CheckboxGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(testLabel)).toHaveStyle(testStyle);
  });
});
