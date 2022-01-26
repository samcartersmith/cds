/* eslint-disable react-native-a11y/has-accessibility-hint */
import React, { useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextHeadline } from '../../typography/TextHeadline';
import { Radio, RadioGroup } from '../RadioGroup';

const RadioGroupScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default" inline>
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

      <Example title="States" inline>
        <Radio checked>Selected</Radio>
        <Radio disabled>Disabled</Radio>
        <Radio readOnly>Read Only</Radio>
        <Radio accessibilityLabel="radio with no label" />
        <Radio>
          This radio has a multi-line label. The radio and label should align at the top. The label
          is super duper long and it keeps going on forever. This radio has a multi-line label.
        </Radio>
      </Example>

      <Example title="Radio Group" inline>
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

          /* eslint-disable react-hooks/rules-of-hooks */
          const [group1, setGroup1] = useState<keyof typeof options1 | undefined>('btc');
          const [group2, setGroup2] = useState<keyof typeof options2>();
          /* eslint-enable react-hooks/rules-of-hooks */

          return (
            <>
              <TextHeadline>Select a Currency</TextHeadline>
              <RadioGroup<keyof typeof options1>
                accessibilityLabel="Select a currency to trade"
                onChange={setGroup1}
                selectedValue={group1}
                options={options1}
              />

              <RadioGroup<keyof typeof options2>
                label={<TextHeadline>Choose as Mascot</TextHeadline>}
                accessibilityLabel="Choose as mascot for your team"
                onChange={setGroup2}
                selectedValue={group2}
                options={options2}
              />
            </>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default RadioGroupScreen;
