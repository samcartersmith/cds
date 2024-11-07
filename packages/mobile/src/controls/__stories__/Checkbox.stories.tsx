import React from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useCheckboxGroupState } from '../../hooks/useCheckboxGroupState';
import { TextHeadline } from '../../typography/TextHeadline';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

const CheckboxScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [checked, { toggle }] = useToggler();
          return (
            <Checkbox checked={checked} onChange={toggle}>
              Default
            </Checkbox>
          );
        }}
      </Example>

      <Example inline title="States">
        <Checkbox checked>Selected</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox checked disabled>
          Checked and disabled
        </Checkbox>
        <Checkbox readOnly>Read Only</Checkbox>
        <Checkbox accessibilityLabel="checkbox with no label" />
        <Checkbox>
          This checkbox has a multi-line label. The checkbox and label should align at the top. The
          label is super duper long and it keeps going on forever. This checkbox has a multi-line
          label.
        </Checkbox>
      </Example>

      <Example inline title="Checkbox Group">
        {() => {
          const options = {
            'fish-taco': 'Fish tacos',
            puttanesca: 'Spaghetti alla puttanesca',
            'hamachi-salad': 'Hamachi salad',
          };

          const optionValues = Object.keys(options) as unknown as (keyof typeof options)[];
          const [selectedValues, { toggle }] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCheckboxGroupState<keyof typeof options>(optionValues);

          return (
            <>
              <TextHeadline>Order Dinner</TextHeadline>
              <CheckboxGroup<keyof typeof options>
                accessibilityLabel="Order Dinner"
                onChange={toggle}
                selectedValues={selectedValues}
              >
                {Object.entries(options).map(([value, label]) => (
                  <Checkbox key={value} value={value}>
                    {label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default CheckboxScreen;
