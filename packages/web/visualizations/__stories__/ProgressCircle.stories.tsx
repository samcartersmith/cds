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
      <ProgressCircle color="positive" progress={0.5} size={100} />
      <ProgressCircle color="negative" progress={0.5} size={100} />
      <ProgressCircle color="primary" progress={0.5} size={100} />
      <ProgressCircle color="foreground" progress={0.5} size={100} />
      <ProgressCircle disabled color="foreground" progress={0.5} size={100} />
    </HStack>
  );
};

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
FillParent.parameters = { percy: enableJavascript };
