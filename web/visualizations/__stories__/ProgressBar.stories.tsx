import { ProgressBar } from '../ProgressBar';
import { VStack } from '../../layout';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';
import { ThemeProvider } from '../../system';
import { TextLabel2, TextTitle3 } from '../../typography';

export default {
  component: ProgressBar,
  title: 'Core Components/ProgressBar',
};

/* eslint-disable react-perf/jsx-no-new-object-as-prop */

export const Default = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} />
          <ProgressBar progress={calculateProgress(0.2)} />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Heavy = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar weight="heavy" progress={calculateProgress(0)} />
          <ProgressBar weight="heavy" progress={calculateProgress(0.2)} />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const LabelAbove = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar
            progress={calculateProgress(0)}
            endLabel={{ value: Math.round(calculateProgress(0) * 100), float: true }}
            labelPlacement="above"
          />
          <ProgressBar
            progress={calculateProgress(0.2)}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100), float: true }}
            labelPlacement="above"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const LabelBelow = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar
            progress={calculateProgress(0)}
            endLabel={{ value: Math.round(calculateProgress(0) * 100), float: true }}
            labelPlacement="below"
          />
          <ProgressBar
            progress={calculateProgress(0.2)}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100), float: true }}
            labelPlacement="below"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const LabelAtBoundsBelow = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar
            progress={calculateProgress(0.2)}
            startLabel={{ value: 0 }}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100) }}
            labelPlacement="below"
          />
          <ProgressBar
            progress={calculateProgress(0.2)}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100) }}
            labelPlacement="below"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const LabelBeside = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar
            progress={calculateProgress(0.2)}
            startLabel={{ value: 0 }}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100) }}
            labelPlacement="beside"
          />
          <ProgressBar
            progress={calculateProgress(0.2)}
            endLabel={{ value: Math.round(calculateProgress(0.2) * 100) }}
            labelPlacement="beside"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Disabled = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <ProgressBar disabled progress={0.5} startLabel={{ value: 50 }} labelPlacement="beside" />
        <ProgressBar disabled progress={0.1} endLabel={{ value: 10 }} labelPlacement="beside" />
        <ProgressBar
          disabled
          progress={0.2}
          startLabel={{ value: 0 }}
          endLabel={{ value: 20 }}
          labelPlacement="beside"
        />
        <ProgressBar
          disabled
          progress={0.5}
          startLabel={{ value: 0 }}
          endLabel={{ value: 50 }}
          labelPlacement="below"
        />
        <ProgressBar disabled progress={0.7} endLabel={{ value: 70, float: true }} />
      </VStack>
    </ThemeProvider>
  );
};

export const Colors = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <ProgressBar color="positive" progress={0.5} />
        <ProgressBar color="negative" progress={0.5} />
        <ProgressBar color="primary" progress={0.5} />
        <ProgressBar color="foreground" progress={0.5} />
        <ProgressBar disabled color="foreground" progress={0.5} />
      </VStack>
    </ThemeProvider>
  );
};

const renderStartLabelNum = (num: number) => {
  return <TextTitle3 as="span">${num.toLocaleString()}</TextTitle3>;
};

const renderEndLabelNum = (num: number) => {
  return (
    <TextLabel2 as="span" align="end" noWrap>
      ${num.toLocaleString()} left
    </TextLabel2>
  );
};

const renderCustomStringLabel: (num: number) => string = (num: number) => {
  return `$${num.toLocaleString()}`;
};

export const CustomLabels = () => {
  return (
    <ProgressContainerWithButtons hideIncrease>
      {() => (
        <VStack gap={2}>
          <ProgressBar
            progress={0.6}
            startLabel={{ value: 12500, render: renderStartLabelNum }}
            endLabel={{ value: 35500, render: renderEndLabelNum }}
            labelPlacement="above"
          />
          <ProgressBar
            progress={0.6}
            endLabel={{ value: 12500, render: renderStartLabelNum, float: true }}
            labelPlacement="above"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const CustomStringLabel = () => {
  return (
    <ProgressContainerWithButtons hideIncrease>
      {() => (
        <VStack gap={2}>
          <ProgressBar
            progress={0.6}
            endLabel={{ value: 35500, render: renderCustomStringLabel, float: true }}
            labelPlacement="above"
          />
          <ProgressBar
            progress={0.6}
            endLabel={{ value: 35500, render: renderCustomStringLabel, float: true }}
            disabled
            labelPlacement="above"
          />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};
