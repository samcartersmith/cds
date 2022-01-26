import React from 'react';
import { Icon } from '../../icons/Icon';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { TextLabel2 } from '../../typography';
import { Tooltip } from '../TooltipV2/Tooltip';

const topTextSubject = 'TOP';
const bottomTextSubject = 'BOTTOM';

const Content = ({ title, tooltipText }: { title: string; tooltipText: string }) => {
  return (
    <Example title={title}>
      <VStack gap={8} background="backgroundAlternate" spacingVertical={2} height={800}>
        <HStack justifyContent="space-around">
          <Tooltip content={tooltipText}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <Tooltip content={tooltipText}>
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText}>
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText}>
            <Icon name="info" size="s" />
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-around">
          <Tooltip content={tooltipText} placement="bottom">
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText} placement="bottom">
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText} placement="bottom">
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <Tooltip content={tooltipText} placement="bottom">
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText} placement="bottom">
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText} placement="bottom">
            <Icon name="info" size="s" />
          </Tooltip>
        </HStack>
      </VStack>
    </Example>
  );
};

const TooltipV2Screen = () => {
  const shortText = 'This is the short text.';
  const longText =
    'This is the really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long text.';

  return (
    <ExampleScreen>
      <Content title="Short Text Tooltip" tooltipText={shortText} />
      <Content title="Long Text Tooltip" tooltipText={longText} />
    </ExampleScreen>
  );
};

export default TooltipV2Screen;
