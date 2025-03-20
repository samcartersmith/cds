import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { TextHeadline, TextLabel1 } from '../../typography';
import { Radio, RadioGroup } from '../RadioGroup';
import { DefaultThemeProvider } from '../../utils/test';

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
    render(
      <DefaultThemeProvider>
        <Radio onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('renders checked radio', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('renders options', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup name="radio-group" onChange={onChange} options={options} value="btc" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getByRole('radiogroup').childNodes).toHaveLength(4);
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup
          label={<TextHeadline as="span">Choose a currency</TextHeadline>}
          name="radio-group"
          onChange={onChange}
          options={options}
          value="btc"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Choose a currency')).toBeTruthy();
  });

  it('triggers onChange', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup
          label={<TextHeadline as="span">Choose a currency</TextHeadline>}
          name="radio-group"
          onChange={onChange}
          options={options}
          testID="test-radio-group"
          value="btc"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-radio-group-eth'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('eth');
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <RadioGroup
            aria-labelledby="choose-a-currency"
            label={
              <TextHeadline as="span" id="choose-a-currency">
                Choose a currency
              </TextHeadline>
            }
            name="radio-group"
            onChange={onChange}
            options={options}
            testID="test-radio-group"
            value="btc"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
});
