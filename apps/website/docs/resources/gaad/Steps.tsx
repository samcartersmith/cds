import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { TextLabel1 } from '@cbhq/cds-web/typography';
import { ProgressBar } from '@cbhq/cds-web/visualizations';

export const Steps = ({ currentStep = 1 }) => {
  return (
    <HStack gap={1} alignItems="flex-start" spacingVertical={2}>
      {/* WITH LABEL STEP ONE, ETC */}
      <VStack width={220}>
        <ProgressBar progress={currentStep >= 2 ? 1 : 0} disableAnimateOnMount={currentStep >= 2} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible direction="horizontal" collapsed={currentStep < 2}>
            <Icon
              name="circleCheckmark"
              size="s"
              spacingEnd={1}
              spacingTop={1}
              accessibilityLabel="Completed"
            />
          </Collapsible>
          <TextLabel1 as="label" color={currentStep >= 2 ? 'primary' : 'foregroundMuted'}>
            Step 1
          </TextLabel1>
        </HStack>
      </VStack>
      <VStack width={220}>
        <ProgressBar progress={currentStep >= 3 ? 1 : 0} disableAnimateOnMount={currentStep >= 3} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible direction="horizontal" collapsed={currentStep < 3}>
            <Icon name="circleCheckmark" size="s" spacingEnd={1} spacingTop={1} />
          </Collapsible>
          <TextLabel1 as="label" color={currentStep >= 3 ? 'primary' : 'foregroundMuted'}>
            Step 2
          </TextLabel1>
        </HStack>
      </VStack>
      <VStack width={220}>
        <ProgressBar progress={currentStep >= 4 ? 1 : 0} disableAnimateOnMount={currentStep >= 4} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible direction="horizontal" collapsed={currentStep < 4}>
            <Icon name="circleCheckmark" size="s" spacingEnd={1} spacingTop={1} />
          </Collapsible>
          <TextLabel1 as="label" color={currentStep >= 4 ? 'primary' : 'foregroundMuted'}>
            Step 3
          </TextLabel1>
        </HStack>
      </VStack>
    </HStack>
  );
};
