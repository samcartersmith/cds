import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { TooltipProps } from '../TooltipV2/TooltipProps';
import { VStack } from '../../layout/VStack';
import { HStack } from '../../layout/HStack';
import { Button } from '../../buttons/Button';
import { Tooltip } from '../TooltipV2/Tooltip';
import { IconButton } from '../../buttons/IconButton';
import { TextLabel1 } from '../../typography';
import { PortalProvider } from '../PortalProvider';

export default {
  title: 'Core Components/TooltipV2',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof Tooltip>;

type BasicTooltipProps = {
  content: TooltipProps['content'];
};

const BasicTooltip = ({ content }: BasicTooltipProps) => {
  return (
    <PortalProvider>
      <HStack spacingHorizontal={8} spacingVertical={2} gap={5}>
        <VStack spacingHorizontal={2} gap={2}>
          <Tooltip content={content}>
            <Button>Default</Button>
          </Tooltip>
          <Tooltip content={content} placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
        </VStack>

        <VStack spacingHorizontal={2} gap={3}>
          <Tooltip content={content}>
            <VStack spacing={2}>
              <IconButton name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <VStack spacing={2}>
              <IconButton name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <VStack spacing={2}>
              <IconButton name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <VStack spacing={2}>
              <IconButton name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
        </VStack>

        <VStack spacing={2} gap={4}>
          <Tooltip content={content}>
            <TextLabel1 as="p">Default</TextLabel1>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <VStack spacing={2}>
              <TextLabel1 as="p">left</TextLabel1>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <VStack spacing={2}>
              <TextLabel1 as="p">right</TextLabel1>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <VStack spacing={2}>
              <TextLabel1 as="p">bottom</TextLabel1>
            </VStack>
          </Tooltip>
        </VStack>
      </HStack>
    </PortalProvider>
  );
};

const Template: ComponentStory<typeof BasicTooltip> = (args: BasicTooltipProps) => (
  <BasicTooltip {...args} />
);

export const Default = Template.bind({});

Default.args = {
  content: 'This is the tooltip Content',
};

export const TooltipLongContent = Template.bind({});

const longContent =
  'This is the tooltip Content. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.';

TooltipLongContent.args = {
  content: longContent,
};
