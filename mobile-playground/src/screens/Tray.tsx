import React from 'react';

import { Button } from '@cbhq/cds-mobile/buttons';
import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';
import { SelectOptionCell } from '@cbhq/cds-mobile/controls/SelectOptionCell';
import { ScrollView, View } from 'react-native';
import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';
import { createStories, CreateTrayProps } from ':cds-storybook/stories/Tray';

const TrayScreen = () => {
  const { DefaultTray, ScrollableTray } = createStories({
    Tray,
    Button,
    SelectOptionCell,
    ScrollView,
    View,
  } as CreateTrayProps);

  return (
    <ExamplesScreen>
      <Example title="Tray">
        <DefaultTray />
      </Example>
      <Example title="Compact Tray">
        <DefaultTray compact />
      </Example>
      <Example title="Tray with Title">
        <DefaultTray title="How much would you like to donate? " />
      </Example>
      <Example title="Tray with Scrollable Children">
        <ScrollableTray title="Lots of options..." />
      </Example>
    </ExamplesScreen>
  );
};

export default TrayScreen;
