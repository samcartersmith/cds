import React from 'react';
import { ScrollView, View } from 'react-native';
import { trayBuilder, CreateTrayProps } from '@cbhq/cds-common/internal/trayBuilder';

import { Button } from '../../buttons/Button';
import { SelectOption } from '../../controls/SelectOption';

import { Tray } from '../Tray/Tray';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const TrayScreen = () => {
  const { DefaultTray, ScrollableTray } = trayBuilder({
    Tray,
    Button,
    SelectOption,
    ScrollView,
    View,
  } as CreateTrayProps);

  return (
    <ExampleScreen>
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
    </ExampleScreen>
  );
};

export default TrayScreen;
