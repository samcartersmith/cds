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
    <Radio name="normal-radio" checked={checked} onChange={toggle}>
      Normal
    </Radio>
  );
};

export const Dense = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <ThemeProvider scale="xSmall">
      <Radio name="dense-radio" checked={checked} onChange={toggle}>
        Dense
      </Radio>
    </ThemeProvider>
  );
};

export const DisabledUnselected = () => <Radio disabled>Disabled unselected</Radio>;

export const DisabledSelected = () => (
  <Radio disabled checked>
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
        id="currency-radio-group"
        label={<TextHeadline as="h1">Choose a currency</TextHeadline>}
        name="radio-group1"
        selectedValue={group1}
        onChange={setGroup1}
        options={options1}
      />
      <TextHeadline as="h1" id="choose-a-mascot">
        Choose a mascot
      </TextHeadline>
      <RadioGroup
        id="mascot-radio-group"
        aria-labelledby="choose-a-mascot"
        name="radio-group2"
        selectedValue={group2}
        onChange={setGroup2}
        options={options2}
      />
      <RadioGroup
        id="horizontal-radio-group"
        label={<TextHeadline as="h1">Choose a currency</TextHeadline>}
        name="radio-group3"
        selectedValue={group3}
        onChange={setGroup3}
        options={options1}
        gap={2}
        direction="horizontal"
      />
      <TextHeadline as="h1">Select a dish to order</TextHeadline>
      <RadioGroup
        name="radio-group4"
        onChange={setGroup4}
        selectedValue={group4}
        options={options3}
        gap={2}
        direction="horizontal"
      />
    </>
  );
};

export default {
  title: 'Core Components/RadioGroup',
  component: RadioGroup,
};
