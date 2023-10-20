import React, { useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextHeadline } from '../../typography/TextHeadline';
import { TextLabel1 } from '../../typography/TextLabel1';
import { Radio, RadioGroup } from '../RadioGroup';

const RadioGroupScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [checked, { toggle }] = useToggler();
          return (
            <Radio checked={checked} onChange={toggle}>
              Default
            </Radio>
          );
        }}
      </Example>

      <Example inline title="States">
        <Radio checked>Selected</Radio>
        <Radio disabled>Disabled</Radio>
        <Radio readOnly>Read Only</Radio>
        <Radio accessibilityLabel="radio with no label" />
        <Radio>
          This radio has a multi-line label. The radio and label should align at the top. The label
          is super duper long and it keeps going on forever. This radio has a multi-line label.
        </Radio>
      </Example>

      <Example inline title="Radio Group">
        {() => {
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
            'hamachi-salad': <TextLabel1>Hamachi salad</TextLabel1>,
          };

          /* eslint-disable react-hooks/rules-of-hooks */
          const [group1, setGroup1] = useState<keyof typeof options1 | undefined>('btc');
          const [group2, setGroup2] = useState<keyof typeof options2>();
          const [group3, setGroup3] = useState<keyof typeof options1>();
          const [group4, setGroup4] = useState<keyof typeof options3>();

          /* eslint-enable react-hooks/rules-of-hooks */

          return (
            <>
              <TextHeadline>Select a Currency</TextHeadline>
              <RadioGroup<keyof typeof options1>
                accessibilityLabel="Select a currency to trade"
                onChange={setGroup1}
                options={options1}
                selectedValue={group1}
              />
              <RadioGroup<keyof typeof options2>
                accessibilityLabel="Choose as mascot for your team"
                label={<TextHeadline>Choose a Mascot</TextHeadline>}
                onChange={setGroup2}
                options={options2}
                selectedValue={group2}
              />
              <TextHeadline>Select a Currency</TextHeadline>
              <RadioGroup<keyof typeof options1>
                accessibilityLabel="Select a currency to trade"
                direction="horizontal"
                gap={2}
                onChange={setGroup3}
                options={options1}
                selectedValue={group3}
              />
              <TextHeadline>Select a dish to order</TextHeadline>
              <RadioGroup<keyof typeof options3>
                accessibilityLabel="Select a dish to order"
                direction="horizontal"
                gap={2}
                onChange={setGroup4}
                options={options3}
                selectedValue={group4}
              />
            </>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default RadioGroupScreen;
