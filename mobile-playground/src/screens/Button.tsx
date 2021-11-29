import React from 'react';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { VStack } from '@cbhq/cds-mobile/layout/VStack';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';

import { entries } from '@cbhq/cds-utils';
import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';
import { createButtonStories } from ':cds-storybook/stories/Button';

const stories = createButtonStories({
  Button,
  ThemeProvider,
  VStack,
});

const ButtonScreen = () => {
  return (
    <ExamplesScreen>
      {entries(stories).map(([name, Component]) => {
        return (
          <Example key={name} inline title={name}>
            <Component />
          </Example>
        );
      })}
    </ExamplesScreen>
  );
};

export default ButtonScreen;
