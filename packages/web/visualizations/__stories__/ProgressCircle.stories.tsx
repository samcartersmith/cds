import { HStack } from '../../layout';
import { enableJavascript } from '../../utils/storybookParams/percy';
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
          <ProgressCircle progress={calculateProgress(0.2)} size={100} />
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
          <ProgressCircle progress={calculateProgress(0)} weight="heavy" size={100} />
          <ProgressCircle progress={calculateProgress(0.2)} weight="heavy" size={100} />
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
          <ProgressCircle progress={calculateProgress(0)} hideText size={100} />
          <ProgressCircle progress={calculateProgress(0.2)} hideText size={100} />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Disabled = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle progress={0} disabled size={100} />
      <ProgressCircle progress={0.2} disabled size={100} />
      <ProgressCircle progress={0.6} disabled size={100} />
      <ProgressCircle progress={1} disabled size={100} />
    </HStack>
  );
};

export const Colors = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle progress={0.5} color="positive" size={100} />
      <ProgressCircle progress={0.5} color="negative" size={100} />
      <ProgressCircle progress={0.5} color="primary" size={100} />
      <ProgressCircle progress={0.5} color="foreground" size={100} />
      <ProgressCircle progress={0.5} color="foreground" disabled size={100} />
    </HStack>
  );
};

export const FillParent = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2} flexWrap="wrap">
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
FillParent.parameters = { percy: enableJavascript };
