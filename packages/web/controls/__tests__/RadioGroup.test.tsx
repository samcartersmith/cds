import { fireEvent, render } from '@testing-library/react';

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
    const { getByTestId } = render(<Radio onChange={jest.fn()} testID="test-radio" />);

    expect(getByTestId('test-radio')).toBeTruthy();
  });

  it('renders checked radio', () => {
    const { getByTestId } = render(<Radio checked onChange={jest.fn()} testID="test-radio" />);

    expect(getByTestId('test-radio')).toBeTruthy();
  });

  it('renders options', () => {
    const { getByRole } = render(
      <RadioGroup name="radio-group" selectedValue="btc" onChange={onChange} options={options} />,
    );

    expect(getByRole('radiogroup')).toBeTruthy();
    expect(getByRole('radiogroup').childNodes).toHaveLength(3);
  });

  it('renders label', () => {
    const { getByText } = render(
      <RadioGroup
        name="radio-group"
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        selectedValue="btc"
        onChange={onChange}
        options={options}
      />,
    );

    expect(getByText('Choose a currency')).toBeTruthy();
  });

  it('triggers onChange', () => {
    const { getByTestId } = render(
      <RadioGroup
        name="radio-group"
        label={<TextHeadline as="span">Choose a currency</TextHeadline>}
        selectedValue="btc"
        onChange={onChange}
        options={options}
        testID="test-radio-group"
      />,
    );

    fireEvent.click(getByTestId('test-radio-group-eth'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('eth');
  });
});
