import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
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
              <ProgressBar
                accessibilityLabel="default progressbar"
                progress={calculateProgress(0)}
              />
              <ProgressBar
                accessibilityLabel="default progressbar"
                progress={calculateProgress(0.2)}
              />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Thin">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="thin" />
              <ProgressBar progress={calculateProgress(0.2)} weight="thin" />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Semiheavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="semiheavy" />
              <ProgressBar progress={calculateProgress(0.2)} weight="semiheavy" />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Heavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="heavy" />
              <ProgressBar progress={calculateProgress(0.2)} weight="heavy" />
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
                labelPlacement="above"
                progress={calculateProgress(0)}
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="above"
                progress={calculateProgress(0.2)}
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
                labelPlacement="below"
                progress={calculateProgress(0)}
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
                progress={calculateProgress(0.2)}
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
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
                startLabel={0}
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
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="beside"
                startLabel={0}
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
        <VStack gap={2}>
          <ProgressBarWithFixedLabels disabled labelPlacement="beside" startLabel={50}>
            <ProgressBar disabled progress={0.5} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={10} labelPlacement="beside">
            <ProgressBar disabled progress={0.1} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={20} labelPlacement="beside" startLabel={0}>
            <ProgressBar disabled progress={0.2} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={50} labelPlacement="beside" startLabel={0}>
            <ProgressBar disabled progress={0.5} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFloatLabel disabled label={70} progress={0.7}>
            <ProgressBar disabled progress={0.7} />
          </ProgressBarWithFloatLabel>
        </VStack>
      </Example>
      <Example title="Colors">
        <VStack gap={2}>
          <ProgressBar color="backgroundPositive" progress={0.5} />
          <ProgressBar color="backgroundNegative" progress={0.5} />
          <ProgressBar color="backgroundPrimary" progress={0.5} />
          <ProgressBar color="backgroundWarning" progress={0.5} />
          <ProgressBar color="backgroundInverse" progress={0.5} />
          <ProgressBar disabled color="backgroundInverse" progress={0.5} />
        </VStack>
      </Example>
      <Example title="CustomLabel">
        <ProgressContainerWithButtons hideIncrease>
          {() => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                endLabel={{ value: 35500, render: renderEndLabelNum }}
                labelPlacement="above"
                startLabel={{ value: 12500, render: renderStartLabelNum }}
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFloatLabel
                label={{ value: 12500, render: renderStartLabelNum }}
                labelPlacement="above"
                progress={0.6}
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
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
                progress={0.6}
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                disabled
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
                progress={0.6}
              >
                <ProgressBar disabled progress={0.6} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disable Mount Animation">
        <ProgressContainerWithButtons hideIncrease>
          {() => <ProgressBar disableAnimateOnMount progress={0.8} />}
        </ProgressContainerWithButtons>
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
