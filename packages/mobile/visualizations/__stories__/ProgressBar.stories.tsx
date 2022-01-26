import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { TextLabel1 } from '../../typography/TextLabel1';
import { TextLabel2 } from '../../typography/TextLabel2';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

const renderStartLabelNum = (num: number) => {
  return <TextLabel1>${num.toLocaleString()}</TextLabel1>;
};

const renderEndLabelNum = (num: number) => {
  return <TextLabel2 align="end">${num.toLocaleString()}&nbsp;left</TextLabel2>;
};

const renderCustomStringLabel: (num: number) => string = (num: number) => {
  return `$${num.toLocaleString()}`;
};

const ProgressBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} />
              <ProgressBar progress={calculateProgress(0.2)} />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Heavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar weight="heavy" progress={calculateProgress(0)} />
              <ProgressBar weight="heavy" progress={calculateProgress(0.2)} />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelAbove">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0) * 100)}
                progress={calculateProgress(0)}
                labelPlacement="above"
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                progress={calculateProgress(0.2)}
                labelPlacement="above"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelBelow">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0) * 100)}
                progress={calculateProgress(0)}
                labelPlacement="below"
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                progress={calculateProgress(0.2)}
                labelPlacement="below"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelAtBoundsBelow">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                startLabel={0}
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelBeside">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                startLabel={0}
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="beside"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="beside"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disabled">
        <ThemeProvider>
          <VStack gap={2}>
            <ProgressBarWithFixedLabels disabled startLabel={50} labelPlacement="beside">
              <ProgressBar disabled progress={0.5} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFixedLabels disabled endLabel={10} labelPlacement="beside">
              <ProgressBar disabled progress={0.1} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFixedLabels
              disabled
              endLabel={20}
              startLabel={0}
              labelPlacement="beside"
            >
              <ProgressBar disabled progress={0.2} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFixedLabels
              disabled
              endLabel={50}
              startLabel={0}
              labelPlacement="beside"
            >
              <ProgressBar disabled progress={0.5} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFloatLabel label={70} progress={0.7} disabled>
              <ProgressBar disabled progress={0.7} />
            </ProgressBarWithFloatLabel>
          </VStack>
        </ThemeProvider>
      </Example>
      <Example title="Colors">
        <ThemeProvider>
          <VStack gap={2}>
            <ProgressBar color="positive" progress={0.5} />
            <ProgressBar color="negative" progress={0.5} />
            <ProgressBar color="primary" progress={0.5} />
            <ProgressBar color="foreground" progress={0.5} />
            <ProgressBar disabled color="foreground" progress={0.5} />
          </VStack>
        </ThemeProvider>
      </Example>
      <Example title="CustomLabel">
        <ProgressContainerWithButtons hideIncrease>
          {() => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                startLabel={{ value: 12500, render: renderStartLabelNum }}
                endLabel={{ value: 35500, render: renderEndLabelNum }}
                labelPlacement="above"
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFloatLabel
                progress={0.6}
                label={{ value: 12500, render: renderStartLabelNum }}
                labelPlacement="above"
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="CustomLabelString">
        <ProgressContainerWithButtons hideIncrease>
          {() => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                progress={0.6}
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                progress={0.6}
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
                disabled
              >
                <ProgressBar progress={0.6} disabled />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
