import React from 'react';
import { buttonStories } from '@cbhq/cds-common2/internal/buttonBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { Text } from '../../typography/Text';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

const ButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Complex example">
        <Button compact endIcon="caretDown" variant="secondary">
          <HStack alignItems="center" justifyContent="center" paddingTop={0}>
            <RemoteImage height={16} resizeMode="cover" shape="circle" width={16} />
            <Text color="fgMuted" font="label2" paddingStart={1} testID="DexInputNetwork">
              Ethereum
            </Text>
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
              <Text font="label1">Test</Text>
            </Button>
            <Button end={<Icon color="fg" name="add" size="s" />} variant="secondary">
              <Text font="label1">Test</Text>
            </Button>
            <Button
              end={<Icon color="fg" name="airdrop" size="s" />}
              endIcon="airdrop"
              variant="secondary"
            >
              <Text font="label1">Test</Text>
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
