import { VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextLabel2, TextTitle3 } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

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
Default.parameters = { percy: enableJavascript };

export const Thin = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <ProgressBar weight="thin" progress={calculateProgress(0)} />
          <ProgressBar weight="thin" progress={calculateProgress(0.2)} />
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};
Thin.parameters = { percy: enableJavascript };

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
Heavy.parameters = { percy: enableJavascript };

export const LabelAbove = () => {
  return (
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
  );
};
LabelAbove.parameters = { percy: enableJavascript };

export const LabelBelow = () => {
  return (
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
  );
};
LabelBelow.parameters = { percy: enableJavascript };

export const LabelAtBoundsBelow = () => {
  return (
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
  );
};
LabelAtBoundsBelow.parameters = { percy: enableJavascript };

export const LabelBeside = () => {
  return (
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
  );
};
LabelBeside.parameters = { percy: enableJavascript };

export const Disabled = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <ProgressBarWithFixedLabels disabled startLabel={50} labelPlacement="beside">
          <ProgressBar disabled progress={0.5} />
        </ProgressBarWithFixedLabels>
        <ProgressBarWithFixedLabels disabled endLabel={10} labelPlacement="beside">
          <ProgressBar disabled progress={0.1} />
        </ProgressBarWithFixedLabels>
        <ProgressBarWithFixedLabels disabled endLabel={20} startLabel={0} labelPlacement="beside">
          <ProgressBar disabled progress={0.2} />
        </ProgressBarWithFixedLabels>
        <ProgressBarWithFixedLabels disabled endLabel={50} startLabel={0} labelPlacement="beside">
          <ProgressBar disabled progress={0.5} />
        </ProgressBarWithFixedLabels>
        <ProgressBarWithFloatLabel label={70} progress={0.7} disabled>
          <ProgressBar disabled progress={0.7} />
        </ProgressBarWithFloatLabel>
      </VStack>
    </ThemeProvider>
  );
};
Disabled.parameters = {
  percy: enableJavascript,
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
Colors.parameters = { percy: enableJavascript };

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
  );
};

export const CustomStringLabel = () => {
  return (
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
  );
};
CustomStringLabel.parameters = { percy: enableJavascript };
