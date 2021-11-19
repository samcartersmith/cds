import React, { memo } from 'react';
import {
  ProgressBarFixedLabelBesideProps,
  ProgressBarFixedLabelContainerProps,
  ProgressBarFixedLabelProps,
  ProgressBarWithFixedLabelsProps,
} from '@cbhq/cds-common/types/ProgressBarBaseProps';
import { getProgressBarLabelParts } from '@cbhq/cds-common/visualizations/getProgressBarLabelParts';
import { I18nManager, View, ViewStyle } from 'react-native';
import { ProgressTextLabel } from './ProgressTextLabel';
import { styles } from './progressStyles';
import { Box, VStack } from '../layout';

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
    const style: ViewStyle = {};
    if (position === 'start') {
      if (I18nManager.isRTL) {
        style.right = 0;
      } else {
        style.left = 0;
      }
    }
    if (position === 'end') {
      if (I18nManager.isRTL) {
        style.left = 0;
      } else {
        style.right = 0;
      }
    }

    return (
      <View
        testID={`cds-progress-bar-fixed-label-${position}`}
        style={[styles.labelTextStyle, style]}
      >
        <ProgressBarFixedLabelBeside label={label} disabled={disabled} />
      </View>
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
      <View testID="label-container" style={styles.progressLabelContainer}>
        {nodes}
      </View>
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

    const leftEl = I18nManager.isRTL ? endLabelEl : startLabelEl;
    const rightEl = I18nManager.isRTL ? startLabelEl : endLabelEl;

    return (
      <VStack testID={testID}>
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer startLabel={startLabel} endLabel={endLabel} />
        )}

        <Box width="100%" flexShrink={0} flexWrap="nowrap" flexDirection="row" alignItems="center">
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
