import { dropdownMaxHeight } from '@cbhq/cds-common/tokens/menu';

import { SelectOption } from '../../controls';
import { VStack } from '../../layout';
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
  <div aria-modal="true" role="dialog" aria-label="Example">
    <DropdownContent {...baseProps} {...props}>
      {defaultOptions.map((option) => (
        <SelectOption value={option} key={option} title={option} testID={`option-${option}`} />
      ))}
      <SelectOption
        value="long"
        key="long"
        title="Really long content that will get clipped when it wants to wrap"
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
  title: 'Core Components/Dropdown/DropdownContent (deprecated - moved to cds-web-overlays)',
  component: DropdownExample,
};
