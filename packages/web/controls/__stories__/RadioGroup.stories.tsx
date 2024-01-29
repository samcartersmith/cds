import { useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Box } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLabel1 } from '../../typography';
import { TextHeadline } from '../../typography/TextHeadline';
import { Radio, RadioGroup } from '../RadioGroup';

export const Normal = () => {
  const [checked, { toggle }] = useToggler();

  return (
    <Radio checked={checked} name="normal-radio" onChange={toggle}>
      Normal
    </Radio>
  );
};

export const Dense = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <ThemeProvider scale="xSmall">
      <Radio checked={checked} name="dense-radio" onChange={toggle}>
        Dense
      </Radio>
    </ThemeProvider>
  );
};

export const DisabledUnselected = () => <Radio disabled>Disabled unselected</Radio>;

export const DisabledSelected = () => (
  <Radio checked disabled>
    Disabled selected
  </Radio>
);

export const MultiLineLabels = () => (
  <Box width="250px">
    <Radio>This radio has a multi-line label. The radio and label should align at the top.</Radio>
  </Box>
);

const options1 = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  dai: 'Dai',
};

const options2 = {
  'yellow-jacket': 'Yellow Jacket',
  bruin: 'Bruin',
  bronco: 'Bronco',
};

const options3 = {
  taco: 'tacos',
  puttanesca: 'Spaghetti',
  'hamachi-salad': <TextLabel1 as="span">Hamachi salad</TextLabel1>,
};

export const Group = () => {
  const [group1, setGroup1] = useState<string>('btc');
  const [group2, setGroup2] = useState<string>();
  const [group3, setGroup3] = useState<string>();
  const [group4, setGroup4] = useState<keyof typeof options3>();

  return (
    <>
      <RadioGroup
        aria-labelledby="choose-a-currency"
        id="currency-radio-group"
        label={
          <TextHeadline as="h1" id="choose-a-currency">
            Choose a currency
          </TextHeadline>
        }
        name="radio-group1"
        onChange={setGroup1}
        options={options1}
        selectedValue={group1}
      />
      <TextHeadline as="h1" id="choose-a-mascot">
        Choose a mascot
      </TextHeadline>
      <RadioGroup
        aria-labelledby="choose-a-mascot"
        id="mascot-radio-group"
        name="radio-group2"
        onChange={setGroup2}
        options={options2}
        selectedValue={group2}
      />
      <RadioGroup
        aria-labelledby="choose-a-currency2"
        direction="horizontal"
        gap={2}
        id="horizontal-radio-group"
        label={
          <TextHeadline as="h1" id="choose-a-currency2">
            Choose a currency
          </TextHeadline>
        }
        name="radio-group3"
        onChange={setGroup3}
        options={options1}
        selectedValue={group3}
      />
      <TextHeadline as="h1" id="select-dish-to-order">
        Select a dish to order
      </TextHeadline>
      <RadioGroup
        aria-labelledby="select-dish-to-order"
        direction="horizontal"
        gap={2}
        name="radio-group4"
        onChange={setGroup4}
        options={options3}
        selectedValue={group4}
      />
    </>
  );
};

export default {
  title: 'Core Components/RadioGroup',
  component: RadioGroup,
};
