import React from 'react';

import { HelperText } from '../HelperText';

export default {
  title: 'Core Components/Inputs/HelperText',
  component: HelperText,
};

export const MessageAreaBasic = () => {
  return <HelperText>Put Message Here</HelperText>;
};

export const MessageAreaColor = () => {
  const colors = [
    'textPositive',
    'textNegative',
    'textForeground',
    'textPrimary',
    'textForegroundMuted',
    'backgroundSecondary',
  ] as const;

  return (
    <div>
      {colors.map((color) => (
        <HelperText color={color}>{`${color} Message Here`}</HelperText>
      ))}
    </div>
  );
};

export const TextAlign = () => {
  const alignments = ['start', 'end', 'center', 'justify'] as const;

  return (
    <div>
      {alignments.map((alignment) => (
        <HelperText textAlign={alignment}>{`${alignment} message`}</HelperText>
      ))}
    </div>
  );
};
