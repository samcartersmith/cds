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
        <Button compact endIcon="caretDown" variant="secondary">
          <HStack alignItems="center" justifyContent="center" spacingTop={0}>
            <RemoteImage height={16} resizeMode="cover" shape="circle" width={16} />
            <TextLabel2 color="foregroundMuted" spacingStart={1} testID="DexInputNetwork">
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
