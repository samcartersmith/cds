import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Checkbox } from '@cbhq/cds-mobile/controls/Checkbox';
import { CheckboxGroup } from '@cbhq/cds-mobile/controls/CheckboxGroup';
import { useCheckboxGroupState } from '@cbhq/cds-mobile/hooks/useCheckboxGroupState';
import { TextHeadline } from '@cbhq/cds-mobile/typography';

import Example from './internal/Example';
import Screen from './internal/Screen';

const CheckboxScreen = () => {
  return (
    <Screen>
      <Example title="Default" inline>
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

      <Example title="States" inline>
        <Checkbox checked>Selected</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox readOnly>Read Only</Checkbox>
        <Checkbox accessibilityLabel="checkbox with no label" />
        <Checkbox>
          This checkbox has a multi-line label. The checkbox and label should align at the top. The
          label is super duper long and it keeps going on forever. This checkbox has a multi-line
          label.
        </Checkbox>
      </Example>

      <Example title="Checkbox Group" inline>
        {() => {
          const options = {
            'fish-taco': 'Fish tacos',
            puttanesca: 'Spaghetti alla puttanesca',
            'hamachi-salad': 'Hamachi salad',
          };

          const optionValues = (Object.keys(options) as unknown) as (keyof typeof options)[];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [selectedValues, { toggle }] = useCheckboxGroupState<keyof typeof options>(
            optionValues
          );

          return (
            <>
              <TextHeadline>Order Dinner</TextHeadline>
              <CheckboxGroup<keyof typeof options>
                accessibilityLabel="Order Dinner"
                selectedValues={selectedValues}
                onChange={toggle}
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
    </Screen>
  );
};

export default CheckboxScreen;
