import React from 'react';
import { View } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

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
              <ProgressCircle progress={calculateProgress(0)} size={100} weight="heavy" />
              <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="heavy" />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="NoText">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle hideText progress={calculateProgress(0)} size={100} />
              <ProgressCircle hideText progress={calculateProgress(0.2)} size={100} />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disabled">
        <HStack gap={2}>
          <ProgressCircle disabled progress={0} size={100} />
          <ProgressCircle disabled progress={0.6} size={100} />
          <ProgressCircle disabled progress={1} size={100} />
        </HStack>
      </Example>
      <Example title="Colors">
        <HStack flexWrap="wrap" gap={2}>
          <ProgressCircle color="positive" progress={0.5} size={100} />
          <ProgressCircle color="negative" progress={0.5} size={100} />
          <ProgressCircle color="primary" progress={0.5} size={100} />
          <ProgressCircle color="foreground" progress={0.5} size={100} />
          <ProgressCircle disabled color="foreground" progress={0.5} size={100} />
        </HStack>
      </Example>
      <Example title="FillParent">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack flexWrap="wrap" gap={2}>
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
