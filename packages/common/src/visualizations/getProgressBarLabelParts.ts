import { ProgressBarLabel } from '../types/ProgressBarBaseProps';

export const getProgressBarLabelParts = (label: ProgressBarLabel) => {
  if (typeof label === 'number') {
    return {
      value: label,
    };
  }

  return {
    value: label.value,
    render: label.render,
  };
};
