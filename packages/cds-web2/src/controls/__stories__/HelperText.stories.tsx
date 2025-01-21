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
    // TO DO: replace backgroundSecondary with textSecondary after value is confirmed with design
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

MessageAreaColor.parameters = {
  a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
};

export const TextAlign = () => {
  const alignments = ['start', 'end'] as const;

  return (
    <div>
      {alignments.map((alignment) => (
        <HelperText textAlign={alignment}>{`${alignment} message`}</HelperText>
      ))}
    </div>
  );
};

export const CustomColor = () => {
  return (
    <div>
      <HelperText color="textNegative" dangerouslySetColor="purple">
        Test message
      </HelperText>
    </div>
  );
};
