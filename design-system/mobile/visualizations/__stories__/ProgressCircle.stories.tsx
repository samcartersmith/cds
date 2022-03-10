import React from 'react';
import { View } from 'react-native';

import { HStack } from '../../layout/HStack';

import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const ProgressBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={1}>
              <ProgressCircle progress={calculateProgress(0)} size={100} />
              <ProgressCircle progress={calculateProgress(0.2)} size={100} />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Heavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle progress={calculateProgress(0)} weight="heavy" size={100} />
              <ProgressCircle progress={calculateProgress(0.2)} weight="heavy" size={100} />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="NoText">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle progress={calculateProgress(0)} hideText size={100} />
              <ProgressCircle progress={calculateProgress(0.2)} hideText size={100} />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disabled">
        <HStack gap={2}>
          <ProgressCircle progress={0} disabled size={100} />
          <ProgressCircle progress={0.6} disabled size={100} />
          <ProgressCircle progress={1} disabled size={100} />
        </HStack>
      </Example>
      <Example title="Colors">
        <HStack gap={2} flexWrap="wrap">
          <ProgressCircle progress={0.5} color="positive" size={100} />
          <ProgressCircle progress={0.5} color="negative" size={100} />
          <ProgressCircle progress={0.5} color="primary" size={100} />
          <ProgressCircle progress={0.5} color="foreground" size={100} />
          <ProgressCircle progress={0.5} color="foreground" disabled size={100} />
        </HStack>
      </Example>
      <Example title="FillParent">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2} flexWrap="wrap">
              <View style={{ height: 100, width: 100 }}>
                <ProgressCircle progress={calculateProgress(0)} />
              </View>
              <View style={{ height: 200, width: 200 }}>
                <ProgressCircle progress={calculateProgress(0.3)} />
              </View>
              <View style={{ height: 100, width: 100 }}>
                <ProgressCircle progress={calculateProgress(0.66)} />
              </View>
              <View style={{ height: 75, width: 75 }}>
                <ProgressCircle progress={calculateProgress(1)} />
              </View>
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
