import React from 'react';
import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { DotSymbol } from '../../dots/DotSymbol';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextLabel1 } from '../../typography/TextLabel1';
import { PortalProvider } from '../PortalProvider';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipProps } from '../Tooltip/TooltipProps';

export default {
  title: 'Core Components/Tooltip/Tooltip',
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
      <HStack gap={5} spacingHorizontal={8} spacingVertical={2}>
        <VStack gap={2} spacingHorizontal={2}>
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
          <Tooltip content={content} placement="bottom" visible={false}>
            <Button disabled>Disabled</Button>
          </Tooltip>
        </VStack>

        <VStack gap={3} spacingHorizontal={2}>
          <Tooltip
            content={
              <VStack gap={2}>
                <Button>Btn 1</Button>
                <Button>Btn 2</Button>
                <Button>Btn 3</Button>
              </VStack>
            }
          >
            <VStack spacing={2}>
              <DotSymbol pin="bottom-start" size="m" source={assets.eth.imageUrl}>
                <IconButton accessibilityLabel="Notifications" name="bell" variant="secondary" />
              </DotSymbol>
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <DotSymbol pin="top-end" size="s" source={assets.ada.imageUrl}>
              <VStack spacing={2}>
                <IconButton accessibilityLabel="Notifications" name="bell" variant="secondary" />
              </VStack>
            </DotSymbol>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <VStack spacing={2}>
              <IconButton accessibilityLabel="Notifications" name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <VStack spacing={2}>
              <IconButton accessibilityLabel="Notifications" name="bell" variant="secondary" />
            </VStack>
          </Tooltip>
        </VStack>

        <VStack gap={4} spacing={2}>
          <Tooltip content={content}>
            <TextLabel1 as="p">Default</TextLabel1>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <VStack spacing={2}>
              <DotSymbol pin="top-end" size="s" source={assets.ada.imageUrl}>
                <VStack spacing={2}>
                  <TextLabel1 as="p">left</TextLabel1>
                </VStack>
              </DotSymbol>
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
