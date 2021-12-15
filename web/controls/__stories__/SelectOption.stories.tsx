import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Inputs/SelectOption',
  component: SelectOption,
};

export const Default = () => <SelectOption description="Description" value="Description" />;
export const Title = () => (
  <SelectOption description="Description" title="Title" value="Description" />
);
export const Compact = () => <SelectOption description="Description" compact value="Description" />;
export const CompactTitle = () => (
  <SelectOption description="Description" title="Title" compact value="Description" />
);
