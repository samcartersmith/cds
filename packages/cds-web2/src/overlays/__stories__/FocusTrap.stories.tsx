import { Button } from '../../buttons';
import { TextInput } from '../../controls/TextInput';
import { VStack } from '../../layout/VStack';
import { TextHeadline } from '../../typography/TextHeadline';
import { FocusTrap } from '../FocusTrap';

export default {
  title: 'Core Components/FocusTrap',
  component: FocusTrap,
};

export const Playground = () => {
  return (
    <VStack gap={3}>
      <TextInput label="I am not within a FocusTrap" />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="bgPrimaryWash" gap={1} padding={3}>
          <TextHeadline as="h1">These components are trapped</TextHeadline>
          <TextInput label="Test 1" />
          <TextInput label="Test 2" />
          <TextInput label="Test 3" />
          <TextInput label="Test 4" />
          <Button>Submit</Button>
        </VStack>
      </FocusTrap>
    </VStack>
  );
};
