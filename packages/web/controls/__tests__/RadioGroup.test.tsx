import { fireEvent, render, screen } from '@testing-library/react';

import { TextHeadline } from '../../typography';
import { Radio, RadioGroup } from '../RadioGroup';

const options = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  dai: 'Dai',
};

const onChange = jest.fn();

describe('RadioGroup.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders radio', () => {
    render(<Radio onChange={jest.fn()} testID="test-radio" />);

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('renders checked radio', () => {
    render(<Radio checked onChange={jest.fn()} testID="test-radio" />);

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('renders options', () => {
    render(
      <RadioGroup name="radio-group" selectedValue="btc" onChange={onChange} options={options} />,
    );

    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getByRole('radiogroup').childNodes).toHaveLength(3);
  });

  it('renders label', () => {
    render(
      <RadioGroup
        name="radio-group"
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        selectedValue="btc"
        onChange={onChange}
        options={options}
      />,
    );

    expect(screen.getByText('Choose a currency')).toBeTruthy();
  });

  it('triggers onChange', () => {
    render(
      <RadioGroup
        name="radio-group"
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        selectedValue="btc"
        onChange={onChange}
        options={options}
        testID="test-radio-group"
      />,
    );

    fireEvent.click(screen.getByTestId('test-radio-group-eth'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('eth');
  });
});
