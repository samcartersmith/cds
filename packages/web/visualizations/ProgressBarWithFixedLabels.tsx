import React, { memo } from 'react';
import {
  ProgressBarFixedLabelBesideProps,
  ProgressBarFixedLabelContainerProps,
  ProgressBarFixedLabelProps,
  ProgressBarWithFixedLabelsProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';

import { Box, VStack } from '../layout';
import { isRtl } from '../utils/isRtl';

import { ProgressTextLabel } from './ProgressTextLabel';

const ProgressBarFixedLabelBeside = memo(
  ({ label, visuallyDisabled }: ProgressBarFixedLabelBesideProps) => {
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    return (
      <ProgressTextLabel
        value={labelNum}
        renderLabel={renderLabel}
        disabled={visuallyDisabled}
        color="foreground"
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
    spacingBottom,
    spacingTop,
  }: ProgressBarFixedLabelContainerProps) => {
    const nodes: React.ReactElement[] = [];
    if (typeof startLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="start-label"
          visuallyDisabled={visuallyDisabled}
          position="start"
          label={startLabel}
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
          visuallyDisabled={visuallyDisabled}
          position="end"
          label={endLabel}
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
        testID="cds-progress-label-container"
        justifyContent="space-between"
        width="100%"
        spacingBottom={spacingBottom}
        spacingTop={spacingTop}
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
      <Box flexShrink={0} flexGrow={0} spacingEnd={1}>
        <ProgressBarFixedLabelBeside label={startLabel} visuallyDisabled={disabled} />
      </Box>
    );

    const endLabelEl = typeof endLabel !== 'undefined' && (
      <Box flexShrink={0} flexGrow={0} spacingStart={1}>
        <ProgressBarFixedLabelBeside label={endLabel} visuallyDisabled={disabled} />
      </Box>
    );

    const leftEl = isRtl() ? endLabelEl : startLabelEl;
    const rightEl = isRtl() ? startLabelEl : endLabelEl;

    return (
      <VStack testID={testID} width="100%">
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer
            visuallyDisabled={disabled}
            startLabel={startLabel}
            endLabel={endLabel}
            spacingBottom={1}
          />
        )}

        <Box width="100%" flexShrink={0} flexWrap="nowrap" alignItems="center">
          {labelPlacement === 'beside' && leftEl}
          {children}
          {labelPlacement === 'beside' && rightEl}
        </Box>

        {labelPlacement === 'below' && (
          <ProgressBarFixedLabelContainer
            visuallyDisabled={disabled}
            startLabel={startLabel}
            endLabel={endLabel}
            spacingTop={1}
          />
        )}
      </VStack>
    );
  },
);
