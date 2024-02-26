import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { VStack } from '@cbhq/cds-web/layout';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { TextLabel1 } from '@cbhq/cds-web/typography';
import { ProgressBar } from '@cbhq/cds-web/visualizations';

export const Steps = ({ currentStep = 1 }) => {
  return (
    <HStack alignItems="flex-start" gap={1} spacingVertical={2}>
      {/* WITH LABEL STEP ONE, ETC */}
      <VStack width={220}>
        <ProgressBar disableAnimateOnMount={currentStep >= 2} progress={currentStep >= 2 ? 1 : 0} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible collapsed={currentStep < 2} direction="horizontal">
            <Icon
              accessibilityLabel="Completed"
              name="circleCheckmark"
              size="s"
              spacingEnd={1}
              spacingTop={1}
            />
          </Collapsible>
          <TextLabel1 as="label" color={currentStep >= 2 ? 'primary' : 'foregroundMuted'}>
            Step 1
          </TextLabel1>
        </HStack>
      </VStack>
      <VStack width={220}>
        <ProgressBar disableAnimateOnMount={currentStep >= 3} progress={currentStep >= 3 ? 1 : 0} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible collapsed={currentStep < 3} direction="horizontal">
            <Icon name="circleCheckmark" size="s" spacingEnd={1} spacingTop={1} />
          </Collapsible>
          <TextLabel1 as="label" color={currentStep >= 3 ? 'primary' : 'foregroundMuted'}>
            Step 2
          </TextLabel1>
        </HStack>
      </VStack>
      <VStack width={220}>
        <ProgressBar disableAnimateOnMount={currentStep >= 4} progress={currentStep >= 4 ? 1 : 0} />
        <HStack alignItems="center" spacingTop={0.5}>
          <Collapsible collapsed={currentStep < 4} direction="horizontal">
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
