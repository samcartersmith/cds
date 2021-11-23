import React from 'react';
import { ScrollView } from 'react-native';

import { Button } from '@cbhq/cds-mobile/buttons';
import { Drawer } from '@cbhq/cds-mobile/overlays';
import { VStack } from '@cbhq/cds-mobile/layout/VStack';
import { SelectOptionCell } from '@cbhq/cds-mobile/controls/SelectOptionCell';
import { LoremIpsum } from './internal/LoremIpsum';
import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { CreateDrawerProps, createStories } from ':cds-storybook/stories/Drawer';

const DrawerScreen = () => {
  const { DefaultDrawer } = createStories({
    Drawer,
    Button,
    LoremIpsum,
    VStack,
    ScrollView,
    SelectOptionCell,
  } as CreateDrawerProps);

  return (
    <ExamplesScreen>
      <Example title="Left Drawer">
        <DefaultDrawer pin="left" />
      </Example>
      <Example title="Bottom Drawer">
        <DefaultDrawer pin="bottom" />
      </Example>
      <Example title="Right Drawer">
        <DefaultDrawer pin="right" />
      </Example>
      <Example title="Top Drawer">
        <DefaultDrawer pin="top" />
      </Example>
    </ExamplesScreen>
  );
};

export default DrawerScreen;
