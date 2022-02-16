import React from 'react';
import { FlatList, View } from 'react-native';
import { trayBuilder, CreateTrayProps } from '@cbhq/cds-common/internal/trayBuilder';

import { Button } from '../../buttons/Button';
import { SelectOption } from '../../controls/SelectOption';

import { Tray } from '../Tray/Tray';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { IconButton } from '../../buttons/IconButton';
import { FeedCard } from '../../cards/FeedCard';
import { Pictogram } from '../../illustrations/Pictogram';
import { HStack, Fallback, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { Menu } from '../../controls/Menu';

const TrayScreen = () => {
  const { DefaultTray, ScrollableTray, FeedCardTray, NavigationTray, TrayWithinTray } = trayBuilder(
    {
      Tray,
      Button,
      SelectOption,
      FlatList,
      View,
      IconButton,
      FeedCard,
      Pictogram,
      HStack,
      VStack,
      TextBody,
      Menu,
      Fallback,
    } as unknown as CreateTrayProps,
  );

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
      <Example title="Tray within a Tray">
        <TrayWithinTray />
      </Example>
      <Example title="Tray with Fallback">
        <ScrollableTray title="You are going to be waiting awhile..." fallbackEnabled />
      </Example>
    </ExampleScreen>
  );
};

export default TrayScreen;
