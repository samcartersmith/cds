import React, { memo } from 'react';
import {
  ProgressBarFixedLabelBesideProps,
  ProgressBarFixedLabelContainerProps,
  ProgressBarFixedLabelProps,
  ProgressBarWithFixedLabelsProps,
} from '@cbhq/cds-common2/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common2/visualizations/getProgressBarLabelParts';

import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { isRtl } from '../utils/isRtl';

import { ProgressTextLabel } from './ProgressTextLabel';

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
      <span data-testid={`cds-progress-bar-fixed-label-${position}`}>
        <ProgressBarFixedLabelBeside label={label} visuallyDisabled={visuallyDisabled} />
      </span>
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
      nodes.push(<div key="end-label-spacer" />);
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
      nodes.push(<div key="start-label-spacer" />);
    }

    if (isRtl()) {
      nodes.reverse();
    }

    return (
      <Box
        alignItems="center"
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

    const leftEl = isRtl() ? endLabelEl : startLabelEl;
    const rightEl = isRtl() ? startLabelEl : endLabelEl;

    return (
      <VStack testID={testID} width="100%">
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer
            endLabel={endLabel}
            paddingBottom={1}
            startLabel={startLabel}
            visuallyDisabled={disabled}
          />
        )}

        <Box alignItems="center" flexShrink={0} flexWrap="nowrap" width="100%">
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
