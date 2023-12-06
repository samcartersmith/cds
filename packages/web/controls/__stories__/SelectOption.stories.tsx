import { VStack } from '../../layout';
import { TextLabel1 } from '../../typography';
import { defaultContext, SelectProvider } from '../selectContext';
import { SelectOption } from '../SelectOption';

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export default {
  title: 'Core Components/Inputs/SelectOption (deprecated - moved to cds-web-overlays)',
  component: SelectOption,
};

/**
 * @deprecated this component will be removed from cds-web in v6.0.0. It has been moved to cds-web-overlays.
 */
export const Stories = () => {
  return (
    <SelectProvider value={defaultContext}>
      <VStack gap={3} width={200}>
        <VStack role="menu">
          <TextLabel1 as="p">Title and Description</TextLabel1>
          <SelectOption description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Disabled</TextLabel1>
          <SelectOption disabled description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Compact</TextLabel1>
          <SelectOption compact description="Description" title="Title" value="test" />
        </VStack>
        <VStack role="menu">
          <TextLabel1 as="p">Multiline</TextLabel1>
          <SelectOption
            multiline
            description="This is a really long description that will be multiple lines long"
            title="Title"
            value="test"
          />
        </VStack>
      </VStack>
    </SelectProvider>
  );
};
