import React from 'react';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

import { ProgressContainerWithButtons } from './ProgressContainerWithButtons';

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
Default.parameters = { percy: { enableJavaScript: true } };

export const Thin = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="thin" />
          <ProgressBar progress={calculateProgress(0.2)} weight="thin" />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};
Thin.parameters = { percy: { enableJavaScript: true } };

export const Semiheavy = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="semiheavy" />
          <ProgressBar progress={calculateProgress(0.2)} weight="semiheavy" />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};
Semiheavy.parameters = { percy: { enableJavaScript: true } };

export const Heavy = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="heavy" />
          <ProgressBar progress={calculateProgress(0.2)} weight="heavy" />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};
Heavy.parameters = { percy: { enableJavaScript: true } };

export const LabelAbove = () => {
  return (
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
  );
};
LabelAbove.parameters = { percy: { enableJavaScript: true } };

export const LabelBelow = () => {
  return (
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
  );
};
LabelBelow.parameters = { percy: { enableJavaScript: true } };

export const LabelAtBoundsBelow = () => {
  return (
    <VStack gap={4}>
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
      <Text as="p" font="label1">
        Wrapped in HStack
      </Text>
      <ProgressContainerWithButtons>
        {({ calculateProgress }) => (
          <HStack gap={2}>
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
          </HStack>
        )}
      </ProgressContainerWithButtons>
    </VStack>
  );
};
LabelAtBoundsBelow.parameters = { percy: { enableJavaScript: true } };

export const LabelBeside = () => {
  return (
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
  );
};
LabelBeside.parameters = { percy: { enableJavaScript: true } };

export const Disabled = () => {
  return (
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
  );
};
Disabled.parameters = {
  percy: { enableJavaScript: true },
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Colors = () => {
  return (
    <VStack gap={2}>
      <ProgressBar color="bgPositive" progress={0.5} />
      <ProgressBar color="bgNegative" progress={0.5} />
      <ProgressBar color="bgPrimary" progress={0.5} />
      <ProgressBar color="bgWarning" progress={0.5} />
      <ProgressBar color="fg" progress={0.5} />
      <ProgressBar disabled color="fg" progress={0.5} />
    </VStack>
  );
};
Colors.parameters = { percy: { enableJavaScript: true } };

const renderStartLabelNum = (num: number) => {
  return (
    <Text as="span" font="title3">
      ${num.toLocaleString()}
    </Text>
  );
};

const renderEndLabelNum = (num: number) => {
  return (
    <Text noWrap as="span" font="label2" textAlign="end">
      ${num.toLocaleString()} left
    </Text>
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
  );
};

export const CustomStringLabel = () => {
  return (
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
  );
};
CustomStringLabel.parameters = { percy: { enableJavaScript: true } };

export const DisableAnimateOnMount = () => {
  return (
    <ProgressContainerWithButtons hideIncrease>
      {() => <ProgressBar disableAnimateOnMount progress={0.8} />}
    </ProgressContainerWithButtons>
  );
};
DisableAnimateOnMount.parameters = { percy: { enableJavaScript: true } };
