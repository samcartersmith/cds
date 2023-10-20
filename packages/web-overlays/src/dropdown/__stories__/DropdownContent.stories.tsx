import React from 'react';
import { dropdownMaxHeight } from '@cbhq/cds-common/tokens/menu';
import { VStack } from '@cbhq/cds-web/layout';

import { SelectOption } from '../../select/SelectOption';
import { DropdownContent, DropdownContentProps } from '../DropdownContent';

const defaultOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
];

const baseProps = {
  width: 200,
  maxWidth: 200,
  height: dropdownMaxHeight,
};

const DropdownExample = (props: Pick<DropdownContentProps, 'placement'>) => (
  <div aria-label="Example" aria-modal="true" role="dialog">
    <DropdownContent {...baseProps} {...props}>
      {defaultOptions.map((option) => (
        <SelectOption key={option} testID={`option-${option}`} title={option} value={option} />
      ))}
      <SelectOption
        key="long"
        title="Really long content that will get clipped when it wants to wrap"
        value="long"
      />
    </DropdownContent>
  </div>
);

export const DropdownContentExamples = () => {
  return (
    <VStack gap={3}>
      {/* this is to make sure there are no visual regressions to dropdown content */}
      <DropdownExample />
      {/* this is to make sure there are no visual regressions when horizontal placement */}
      <DropdownExample placement="right-start" />
    </VStack>
  );
};

export default {
  title: 'Overlays/Dropdown/DropdownContent',
  component: DropdownExample,
};
