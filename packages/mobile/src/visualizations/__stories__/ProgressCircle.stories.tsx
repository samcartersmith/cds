import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

const AnimationCallbacksExample = () => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');

  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);

  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <Text font="label1">Animation Status: {animationStatus}</Text>
          <HStack gap={2}>
            <ProgressCircle
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
              progress={calculateProgress(0.2)}
              size={100}
            />
          </HStack>
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

const ProgressBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={1}>
              <ProgressCircle progress={calculateProgress(0)} size={100} />
              <ProgressCircle
                accessibilityLabel="Custom accessibility label for progress circle"
                progress={calculateProgress(0.2)}
                size={100}
              />
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
          <ProgressCircle color="bgPositive" progress={0.5} size={100} />
          <ProgressCircle color="bgNegative" progress={0.5} size={100} />
          <ProgressCircle color="bgPrimary" progress={0.5} size={100} />
          <ProgressCircle color="bgInverse" progress={0.5} size={100} />
          <ProgressCircle disabled color="bgInverse" progress={0.5} size={100} />
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
      <Example title="Animation Callbacks">
        <AnimationCallbacksExample />
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
