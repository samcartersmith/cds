import React from 'react';
import { ScrollView, View } from 'react-native';
import { CreateTrayProps, trayBuilder } from '@cbhq/cds-common/internal/trayBuilder';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { FeedCard } from '../../cards/FeedCard';
import { SelectOption } from '../../controls/SelectOption';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack } from '../../layout/HStack';
import { Tray } from '../Tray/Tray';

const TrayScreen = () => {
  const { DefaultTray, ScrollableTray, FeedCardTray, NavigationTray } = trayBuilder({
    Tray,
    Button,
    SelectOption,
    ScrollView,
    View,
    IconButton,
    FeedCard,
    Pictogram,
    HStack,
  } as CreateTrayProps);

  return (
    <ExampleScreen>
      <Example title="Tray">
        <DefaultTray />
      </Example>
      <Example title="Tray with Title">
        <DefaultTray title="How much would you like to donate? " />
      </Example>
      <Example title="Tray with Scrollable Children">
        <ScrollableTray title="Lots of options..." />
      </Example>
      <Example title="Feed Card with Tray">
        <FeedCardTray />
      </Example>
      <Example title="Navigation with Tray">
        <NavigationTray />
      </Example>
    </ExampleScreen>
  );
};

export default TrayScreen;
