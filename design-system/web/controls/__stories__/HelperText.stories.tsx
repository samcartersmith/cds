import { HelperText } from '../HelperText';

export default {
  title: 'Core Components/Inputs/HelperText',
  component: HelperText,
};

export const MessageAreaBasic = () => {
  return <HelperText>Put Message Here</HelperText>;
};

export const MessageAreaColor = () => {
  // return <HelperText color="positive">Positive Colored Message Here</HelperText>;
  const colors = ['positive', 'negative', 'foreground'] as const;

  return (
    <div>
      {colors.map((color) => (
        <HelperText color={color}>{`${color} Message Here`}</HelperText>
      ))}
    </div>
  );
};

export const TextAlign = () => {
  const alignments = ['start', 'end'] as const;

  return (
    <div>
      {alignments.map((alignment) => (
        <HelperText align={alignment}>{`${alignment} message`}</HelperText>
      ))}
    </div>
  );
};
