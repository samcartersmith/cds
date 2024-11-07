import { Button, IconButton } from '../buttons';
import { VStack } from '../layout';
import { TextBody, TextDisplay2, TextHeadline } from '../typography';

// this includes everything except SparklineInteractive has a filled area in Frontier, however that component has been decomped to its own package
export const FrontierExample = () => (
  <VStack gap={3} spacingHorizontal={2} spacingVertical={3}>
    <TextHeadline as="h3" spacingBottom={3}>
      The following components are intended to be used purely for visual regression testing when
      Frontier is enabled as the default treatment for CDS libraries.
    </TextHeadline>
    <VStack background borderRadius="roundedLarge" elevation={1} gap={2} spacing={2}>
      <TextBody as="p" spacingBottom={3}>
        Secondary palette is unchanged when the parent has an elevation of 1
      </TextBody>
      <Button variant="secondary">Secondary button</Button>
    </VStack>
    <VStack background borderRadius="roundedLarge" elevation={2} gap={2} spacing={2}>
      <TextBody as="p" spacingBottom={3}>
        Secondary palette is unchanged when the parent has an elevation of 2
      </TextBody>
      <Button variant="secondary">Secondary button</Button>
    </VStack>
    <VStack background bordered borderRadius="roundedLarge" gap={2} spacing={2}>
      <TextBody as="p" spacingBottom={3}>
        Secondary buttons have a filled grey background and no border.
      </TextBody>
      <Button variant="secondary">Secondary button</Button>
      <Button transparent variant="secondary">
        Secondary button transparent
      </Button>
      <IconButton accessibilityLabel="test" name="add" variant="secondary" />
      <IconButton transparent accessibilityLabel="test" name="add" variant="secondary" />
    </VStack>
    <VStack bordered borderRadius="roundedLarge" spacing={2}>
      <TextBody as="p" spacingBottom={3}>
        Display 2 font size and line height are larger.
      </TextBody>
      <TextDisplay2 as="h2">Display 2</TextDisplay2>
    </VStack>
    <VStack bordered borderRadius="roundedLarge" spacing={2}>
      <TextBody as="p" spacingBottom={3}>
        Primary blue is lighter in dark mode
      </TextBody>
      <Button variant="primary">Primary</Button>
    </VStack>
  </VStack>
);

export default {
  title: 'Frontier Changes',
  component: FrontierExample,
};
