import { VStack } from '../../layout/VStack';
import { TextLabel2 } from '../../typography/TextLabel2';

export const Note = ({ children }: { children: React.ReactNode }) => (
  <>
    <VStack background="backgroundAlternate" borderRadius="rounded" spacing={2}>
      <TextLabel2 as="p">{children}</TextLabel2>
    </VStack>
    <br />
  </>
);
