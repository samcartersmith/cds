import React from 'react';
import { buttonBuilderDeprecated } from '@cbhq/cds-common/internal/buttonBuilderDeprecated';
import { entries } from '@cbhq/cds-utils';

import { VStack } from '../../layout/VStack';
import { Button } from '../Button';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const stories = buttonBuilderDeprecated({
  Button,
  VStack,
});

const ButtonScreen = () => {
  return (
    <ExampleScreen>
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
