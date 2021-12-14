import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Inputs/SelectOption',
  component: SelectOption,
};

export const Default = () => <SelectOption description="Description" />;
export const Title = () => <SelectOption description="Description" title="Title" />;
export const Compact = () => <SelectOption description="Description" compact />;
export const CompactTitle = () => <SelectOption description="Description" title="Title" compact />;
