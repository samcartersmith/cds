import React from 'react';
import { buttonStories } from '@cbhq/cds-common/internal/buttonBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { RemoteImage } from '../../media/RemoteImage';
import { TextLabel2 } from '../../typography/TextLabel2';
import { Button } from '../Button';

const ButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Complex example">
        <Button endIcon="caretDown" compact variant="secondary">
          <HStack spacingTop={0} alignItems="center" justifyContent="center">
            <RemoteImage shape="circle" height={16} width={16} resizeMode="cover" />
            <TextLabel2 spacingStart={1} color="foregroundMuted" testID="DexInputNetwork">
              Ethereum
            </TextLabel2>
          </HStack>
        </Button>
      </Example>
      {buttonStories.map((props) => {
        return (
          <Example inline>
            <Button {...props}>I am a button/</Button>
          </Example>
        );
      })}
      <Example title="Long text content">
        <Button>
          Some really really really long button text that should get truncated after wrapping two
          lines
        </Button>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonScreen;
