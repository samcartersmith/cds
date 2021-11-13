import React from 'react';
import { ProgressBar } from '@cbhq/cds-mobile/visualizations/ProgressBar';
import { VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { TextLabel2, TextLabel1 } from '@cbhq/cds-mobile/typography';
import { ProgressContainerWithButtons } from '@cbhq/cds-mobile/visualizations/ProgressContainerWithButtons';
import ExamplesScreen from './internal/ExamplesScreen';
import Example from './internal/Example';

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
    <ExamplesScreen>
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
      </Example>
      <Example title="LabelBelow">
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
      </Example>
      <Example title="LabelAtBoundsBelow">
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
      </Example>
      <Example title="LabelBeside">
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
      </Example>
      <Example title="Disabled">
        <ThemeProvider>
          <VStack gap={2}>
            <ProgressBar
              disabled
              progress={0.5}
              startLabel={{ value: 50 }}
              labelPlacement="beside"
            />
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
      </Example>
      <Example title="CustomLabelString">
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
      </Example>
    </ExamplesScreen>
  );
};

export default ProgressBarScreen;
