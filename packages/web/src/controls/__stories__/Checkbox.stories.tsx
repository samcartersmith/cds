import { css } from '@linaria/core';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';

import { useCheckboxGroupState } from '../../hooks/useCheckboxGroupState';
import { Box } from '../../layout/Box';
import { ThemeProvider } from '../../system/ThemeProvider';
import { palette } from '../../tokens';
import { TextHeadline } from '../../typography/TextHeadline';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';

export const Normal = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <Checkbox checked={checked} name="normal-checkbox" onChange={toggle}>
      Normal
    </Checkbox>
  );
};

export const Indeterminate = () => {
  const [indeterminate, { toggle }] = useToggler();
  return (
    <Checkbox indeterminate={indeterminate} name="indeterminate-checkbox" onChange={toggle}>
      Indeterminate
    </Checkbox>
  );
};

export const Dense = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <ThemeProvider scale="xSmall">
      <Checkbox checked={checked} name="dense-checkbox" onChange={toggle}>
        Dense
      </Checkbox>
    </ThemeProvider>
  );
};

export const DarkNormal = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <ThemeProvider scale={DEFAULT_SCALE} spectrum="dark">
      <div
        className={css`
          padding: 20px;
          /* All stories have the light story container. This offsets the light story container's padding. */
          margin: -20px;
          background-color: ${palette.background};
        `}
      >
        {' '}
        <Checkbox checked={checked} onChange={toggle}>
          Normal
        </Checkbox>
      </div>
    </ThemeProvider>
  );
};

export const NoLabel = () => {
  const [checked, { toggle }] = useToggler();
  return <Checkbox checked={checked} onChange={toggle} />;
};

// This story does not render a label on purpose
NoLabel.parameters = { a11y: { config: { rules: [{ id: 'label', enabled: false }] } } };

export const DisabledUnselected = () => (
  <Checkbox checked disabled>
    Disabled selected
  </Checkbox>
);

export const ReadOnlyUnselected = () => <Checkbox readOnly>Read-only unselected</Checkbox>;
ReadOnlyUnselected.parameters = {
  /**
   * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
   * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
   */
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

export const ReadOnlySelected = () => (
  <Checkbox checked readOnly>
    Read-only selected
  </Checkbox>
);
ReadOnlySelected.parameters = {
  /**
   * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
   * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
   */
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

export const MultiLineLabel = () => (
  <Box width="250px">
    <Checkbox>
      This checkbox has a multi-line label. The checkbox and label should align at the top.
    </Checkbox>
  </Box>
);

const options = {
  'fish-taco': 'Fish tacos',
  puttanesca: 'Spaghetti alla puttanesca',
  'hamachi-salad': 'Hamachi salad',
};
const optionValues = Object.keys(options);

export const Group = () => {
  const [selectedValues, { toggle }] = useCheckboxGroupState(optionValues);
  return (
    <>
      <TextHeadline as="h1" id="order-dinner-label-no-select-all">
        Checkbox Group Default
      </TextHeadline>
      <CheckboxGroup
        aria-labelledby="order-dinner-label-no-select-all"
        name="checkbox-group-default"
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
};

export const CustomStylesCheckboxGroup = () => {
  const [selectedValues, { toggle }] = useCheckboxGroupState(optionValues);
  return (
    <>
      <TextHeadline as="h1" id="custom-styles-checkbox-group">
        Custom checkbox group
      </TextHeadline>
      <CheckboxGroup
        aria-labelledby="custom-styles-checkbox-group"
        name="checkbox-group-custom-styles"
        selectedValues={selectedValues}
      >
        {Object.entries(options).map(([value, label]) => (
          <div key={value} style={{ padding: '6px 8px' }}>
            <Checkbox checked={selectedValues.has(value)} onChange={toggle} value={value}>
              {label}
            </Checkbox>
          </div>
        ))}
      </CheckboxGroup>
    </>
  );
};

export default {
  title: 'Core Components/Checkbox',
  component: Checkbox,
};
