import React, { useCallback } from 'react';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

export default {
  component: ProgressCircle,
  title: 'Core Components/ProgressCircle',
};

export const Default = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} />
          <ProgressCircle
            accessibilityLabel="Custom accessibility label for progress circle"
            progress={calculateProgress(0.2)}
            size={100}
          />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Heavy = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} weight="heavy" />
          <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="heavy" />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const NoText = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle hideText progress={calculateProgress(0)} size={100} />
          <ProgressCircle hideText progress={calculateProgress(0.2)} size={100} />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Disabled = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle disabled progress={0} size={100} />
      <ProgressCircle disabled progress={0.2} size={100} />
      <ProgressCircle disabled progress={0.6} size={100} />
      <ProgressCircle disabled progress={1} size={100} />
    </HStack>
  );
};

export const Colors = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle color="bgPositive" progress={0.5} size={100} />
      <ProgressCircle color="bgNegative" progress={0.5} size={100} />
      <ProgressCircle color="bgPrimary" progress={0.5} size={100} />
      <ProgressCircle color="fg" progress={0.5} size={100} />
      <ProgressCircle disabled color="fg" progress={0.5} size={100} />
    </HStack>
  );
};

export const AnimationCallbacks = () => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');

  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);

  return (
    <VStack gap={4}>
      <Text as="p" display="block" font="label1">
        Animation Status: {animationStatus}
      </Text>
      <ProgressContainerWithButtons>
        {({ calculateProgress }) => (
          <HStack gap={2}>
            <ProgressCircle
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
              progress={calculateProgress(0.2)}
              size={100}
            />
          </HStack>
        )}
      </ProgressContainerWithButtons>
    </VStack>
  );
};
AnimationCallbacks.parameters = { percy: { enableJavaScript: true } };

export const FillParent = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack flexWrap="wrap" gap={2}>
          <div style={{ height: '300px', width: '300px' }}>
            <ProgressCircle progress={calculateProgress(0)} />
          </div>
          <div style={{ height: '200px', width: '200px' }}>
            <ProgressCircle progress={calculateProgress(0.3)} />
          </div>
          <div style={{ height: '100px', width: '100px' }}>
            <ProgressCircle progress={calculateProgress(0.66)} />
          </div>
          <div style={{ height: '75px', width: '75px' }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
          <div style={{ height: '10vw', width: '10vw' }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};
FillParent.parameters = { percy: { enableJavaScript: true } };
