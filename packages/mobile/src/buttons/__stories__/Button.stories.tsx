import React from 'react';
import { buttonBuilderDeprecated } from '@cbhq/cds-common/internal/buttonBuilderDeprecated';
import { entries } from '@cbhq/cds-utils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Button } from '../Button';

const stories = buttonBuilderDeprecated({
  Button,
  ThemeProvider,
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
