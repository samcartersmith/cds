import React, { memo } from 'react';
import {
  ProgressBarFixedLabelBesideProps,
  ProgressBarFixedLabelContainerProps,
  ProgressBarFixedLabelProps,
  ProgressBarWithFixedLabelsProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';
import { cx } from 'linaria';
import * as progressBarStyles from './progressBarStyles';
import { Box, VStack } from '../layout';
import { ProgressTextLabel } from './ProgressTextLabel';
import { isRtl } from '../utils/isRtl';

const ProgressBarFixedLabelBeside: React.FC<ProgressBarFixedLabelBesideProps> = memo(
  ({ label, disabled }) => {
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    return (
      <ProgressTextLabel
        value={labelNum}
        renderLabel={renderLabel}
        disabled={disabled}
        color="foreground"
      />
    );
  },
);

const ProgressBarFixedLabel: React.FC<ProgressBarFixedLabelProps> = memo(
  ({ label, position, disabled }) => {
    const style: React.CSSProperties = {};
    if (position === 'start') {
      if (isRtl()) {
        style.right = '0';
      } else {
        style.left = '0';
      }
    }
    if (position === 'end') {
      if (isRtl()) {
        style.left = '0';
      } else {
        style.right = '0';
      }
    }

    return (
      <span
        data-testid={`cds-progress-bar-fixed-label-${position}`}
        className={progressBarStyles.labelText}
        style={style}
      >
        <ProgressBarFixedLabelBeside label={label} disabled={disabled} />
      </span>
    );
  },
);

const ProgressBarFixedLabelContainer: React.FC<ProgressBarFixedLabelContainerProps> = memo(
  ({ startLabel, endLabel, disabled }) => {
    const nodes: React.ReactElement[] = [];
    if (typeof startLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="start-label"
          disabled={disabled}
          position="start"
          label={startLabel}
        />,
      );
    }

    if (typeof endLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="end-label"
          disabled={disabled}
          position="end"
          label={endLabel}
        />,
      );
    }

    return (
      <div
        data-testid="cds-progress-label-container"
        className={cx(progressBarStyles.labelContainer)}
      >
        {nodes}
      </div>
    );
  },
);

export const ProgressBarWithFixedLabels: React.FC<ProgressBarWithFixedLabelsProps> = memo(
  ({ startLabel, endLabel, labelPlacement = 'beside', disabled, children, testID }) => {
    const startLabelEl = typeof startLabel !== 'undefined' && (
      <Box flexShrink={0} flexGrow={0} spacingEnd={1}>
        <ProgressBarFixedLabelBeside label={startLabel} disabled={disabled} />
      </Box>
    );

    const endLabelEl = typeof endLabel !== 'undefined' && (
      <Box flexShrink={0} flexGrow={0} spacingStart={1}>
        <ProgressBarFixedLabelBeside label={endLabel} disabled={disabled} />
      </Box>
    );

    const leftEl = isRtl() ? endLabelEl : startLabelEl;
    const rightEl = isRtl() ? startLabelEl : endLabelEl;

    return (
      <VStack testID={testID}>
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer startLabel={startLabel} endLabel={endLabel} />
        )}

        <Box width="100%" flexShrink={0} flexWrap="nowrap">
          {labelPlacement === 'beside' && leftEl}
          {children}
          {labelPlacement === 'beside' && rightEl}
        </Box>

        {labelPlacement === 'below' && (
          <ProgressBarFixedLabelContainer startLabel={startLabel} endLabel={endLabel} />
        )}
      </VStack>
    );
  },
);
