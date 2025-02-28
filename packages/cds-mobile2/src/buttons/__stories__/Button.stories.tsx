import React from 'react';
import { buttonStories } from '@cbhq/cds-common2/internal/buttonBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { TextLabel1 } from '../../typography';
import { TextLabel2 } from '../../typography/TextLabel2';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

const ButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Complex example">
        <Button compact endIcon="caretDown" variant="secondary">
          <HStack alignItems="center" justifyContent="center" paddingTop={0}>
            <RemoteImage height={16} resizeMode="cover" shape="circle" width={16} />
            <TextLabel2 color="fgMuted" paddingStart={1} testID="DexInputNetwork">
              Ethereum
            </TextLabel2>
          </HStack>
        </Button>
      </Example>
      {buttonStories.map((props) => {
        return (
          <Example inline>
            <Button {...props}>I am a button</Button>
          </Example>
        );
      })}
      <Example title="Long text content">
        <Button>
          Some really really really long button text that should get truncated after wrapping two
          lines
        </Button>
      </Example>

      <Example title="Custom endIcon on Button">
        <VStack gap={2}>
          <ButtonGroup accessibilityLabel="Group">
            <Button end={<Icon color="fg" name="caretRight" size="s" />}>
              <TextLabel1>Test</TextLabel1>
            </Button>
            <Button end={<Icon color="fg" name="add" size="s" />} variant="secondary">
              <TextLabel1>Test</TextLabel1>
            </Button>
            <Button
              end={<Icon color="fg" name="airdrop" size="s" />}
              endIcon="airdrop"
              variant="secondary"
            >
              <TextLabel1>Test</TextLabel1>
            </Button>
          </ButtonGroup>
        </VStack>
      </Example>
      <Example title="Custom wrapperStyles for Wallet">
        <Button
          transparent
          wrapperStyles={{
            base: { backgroundColor: 'green' },
          }}
        >
          Hello world
        </Button>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonScreen;
