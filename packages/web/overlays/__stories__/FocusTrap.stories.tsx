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
      <TextInput />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="primaryWash" spacing={3} gap={1}>
          <TextHeadline as="h1">These components are trapped</TextHeadline>
          <TextInput />
          <TextInput />
          <TextInput />
          <TextInput />
          <Button>Submit</Button>
        </VStack>
      </FocusTrap>
    </VStack>
  );
};
