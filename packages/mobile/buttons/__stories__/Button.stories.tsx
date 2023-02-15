import React from 'react';
import { buttonBuilderDeprecated } from '@cbhq/cds-common/internal/buttonBuilderDeprecated';
import { entries } from '@cbhq/cds-utils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { RemoteImage } from '../../media/RemoteImage';
import { TextLabel2 } from '../../typography/TextLabel2';
import { Button } from '../Button';

const stories = buttonBuilderDeprecated({
  Button,
  VStack,
});

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
      {entries(stories).map(([name, Component]) => {
        return (
          <Example key={name} inline title={name}>
            <Component />
          </Example>
        );
      })}
    </ExampleScreen>
  );
};

export default ButtonScreen;
