import { VStack } from '../../layout';
import { TextLabel1 } from '../../typography';
import { defaultContext, SelectProvider } from '../selectContext';
import { SelectOption } from '../SelectOption';

export default {
  title: 'Core Components/Inputs/SelectOption',
  component: SelectOption,
};

export const Stories = () => {
  return (
    <SelectProvider value={defaultContext}>
      <VStack gap={3} width={200}>
        <VStack>
          <TextLabel1 as="p">Title and Description</TextLabel1>
          <SelectOption title="Title" description="Description" value="test" />
        </VStack>
        <VStack>
          <TextLabel1 as="p">Disabled</TextLabel1>
          <SelectOption disabled title="Title" description="Description" value="test" />
        </VStack>
        <VStack>
          <TextLabel1 as="p">Compact</TextLabel1>
          <SelectOption compact title="Title" description="Description" value="test" />
        </VStack>
        <VStack>
          <TextLabel1 as="p">Multiline</TextLabel1>
          <SelectOption
            multiline
            title="Title"
            description="This is a really long description that will be multiple lines long"
            value="test"
          />
        </VStack>
      </VStack>
    </SelectProvider>
  );
};
