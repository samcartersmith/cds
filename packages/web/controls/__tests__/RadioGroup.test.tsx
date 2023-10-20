import { fireEvent, render, screen } from '@testing-library/react';

import { TextHeadline, TextLabel1 } from '../../typography';
import { Radio, RadioGroup } from '../RadioGroup';

const options = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  dai: 'Dai',
  usdc: <TextLabel1 as="span">Custom ReactNode</TextLabel1>,
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
      <RadioGroup name="radio-group" onChange={onChange} options={options} selectedValue="btc" />,
    );

    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getByRole('radiogroup').childNodes).toHaveLength(4);
  });

  it('renders label', () => {
    render(
      <RadioGroup
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        name="radio-group"
        onChange={onChange}
        options={options}
        selectedValue="btc"
      />,
    );

    expect(screen.getByText('Choose a currency')).toBeTruthy();
  });

  it('triggers onChange', () => {
    render(
      <RadioGroup
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        name="radio-group"
        onChange={onChange}
        options={options}
        selectedValue="btc"
        testID="test-radio-group"
      />,
    );

    fireEvent.click(screen.getByTestId('test-radio-group-eth'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('eth');
  });
});
