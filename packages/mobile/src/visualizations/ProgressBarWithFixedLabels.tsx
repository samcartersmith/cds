import React, { memo } from 'react';
import { I18nManager, View } from 'react-native';
import type { PaddingProps, Placement } from '@cbhq/cds-common/types';

import { Box, VStack } from '../layout';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';
import { type ProgressBaseProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';

export type ProgressBarWithFixedLabelsProps = Pick<ProgressBaseProps, 'disabled' | 'testID'> & {
  /** Label that is pinned to the start of the container. If a number is used then it will format it as a percentage. */
  startLabel?: ProgressBarLabel;
  /** Label that is pinned to the end of the container. If a number is used then it will format it as a percentage. */
  endLabel?: ProgressBarLabel;
  /**
   * Position of label relative to the bar
   * @default beside
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below' | 'beside'>;
};

export type ProgressBarFixedLabelBesideProps = {
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

export type ProgressBarFixedLabelContainerProps = Omit<
  ProgressBarWithFixedLabelsProps,
  'labelPlacement' | 'progress' | 'disabled'
> &
  Pick<PaddingProps, 'paddingBottom' | 'paddingTop'> & {
    visuallyDisabled: boolean;
  };

export type ProgressBarFixedLabelProps = {
  position: 'start' | 'end';
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

const ProgressBarFixedLabelBeside = memo(
  ({ label, visuallyDisabled }: ProgressBarFixedLabelBesideProps) => {
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    return (
      <ProgressTextLabel
        color="fg"
        disabled={visuallyDisabled}
        renderLabel={renderLabel}
        value={labelNum}
      />
    );
  },
);

const ProgressBarFixedLabel = memo(
  ({ label, position, visuallyDisabled }: ProgressBarFixedLabelProps) => {
    return (
      <View testID={`cds-progress-bar-fixed-label-${position}`}>
        <ProgressBarFixedLabelBeside label={label} visuallyDisabled={visuallyDisabled} />
      </View>
    );
  },
);

const ProgressBarFixedLabelContainer = memo(
  ({
    startLabel,
    endLabel,
    visuallyDisabled,
    paddingBottom,
    paddingTop,
  }: ProgressBarFixedLabelContainerProps) => {
    const nodes: React.ReactElement[] = [];

    if (typeof startLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="start-label"
          label={startLabel}
          position="start"
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes an end label to the end if no start label is available to push it
      nodes.push(<View key="end-label-spacer" />);
    }

    if (typeof endLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="end-label"
          label={endLabel}
          position="end"
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes a start label to the start if there is no end label available to push it
      nodes.push(<View key="start-label-spacer" />);
    }

    if (I18nManager.isRTL) {
      nodes.reverse();
    }

    return (
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        testID="cds-progress-label-container"
        width="100%"
      >
        {nodes}
      </Box>
    );
  },
);

export const ProgressBarWithFixedLabels: React.FC<
  React.PropsWithChildren<ProgressBarWithFixedLabelsProps>
> = memo(
  ({ startLabel, endLabel, labelPlacement = 'beside', disabled = false, children, testID }) => {
    const startLabelEl = typeof startLabel !== 'undefined' && (
      <Box flexGrow={0} flexShrink={0} paddingEnd={1}>
        <ProgressBarFixedLabelBeside label={startLabel} visuallyDisabled={disabled} />
      </Box>
    );

    const endLabelEl = typeof endLabel !== 'undefined' && (
      <Box flexGrow={0} flexShrink={0} paddingStart={1}>
        <ProgressBarFixedLabelBeside label={endLabel} visuallyDisabled={disabled} />
      </Box>
    );

    const leftEl = I18nManager.isRTL ? endLabelEl : startLabelEl;
    const rightEl = I18nManager.isRTL ? startLabelEl : endLabelEl;

    return (
      <VStack testID={testID}>
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer
            endLabel={endLabel}
            paddingBottom={1}
            startLabel={startLabel}
            visuallyDisabled={disabled}
          />
        )}

        <Box alignItems="center" flexDirection="row" flexShrink={0} flexWrap="nowrap" width="100%">
          {labelPlacement === 'beside' && leftEl}
          {children}
          {labelPlacement === 'beside' && rightEl}
        </Box>

        {labelPlacement === 'below' && (
          <ProgressBarFixedLabelContainer
            endLabel={endLabel}
            paddingTop={1}
            startLabel={startLabel}
            visuallyDisabled={disabled}
          />
        )}
      </VStack>
    );
  },
);
