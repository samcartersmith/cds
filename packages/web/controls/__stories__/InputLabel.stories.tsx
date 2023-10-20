import { css } from 'linaria';

import { InputLabel } from '../InputLabel';

export default {
  title: 'Core Components/Inputs/InputLabel',
  component: InputLabel,
};

export const InputLabelBasic = () => {
  return <InputLabel>Label</InputLabel>;
};

export const InputLabelTextAlignments = () => {
  const textAlignments = ['start', 'end', 'center'] as const;
  const wrapperStyle = css`
    width: 100px;
  `;

  return (
    <div>
      {textAlignments.map((align) => (
        <div key={align} className={wrapperStyle}>
          <InputLabel align={align}>{`${align} Label`}</InputLabel>
        </div>
      ))}
    </div>
  );
};

export const LabelColor = () => {
  return <InputLabel color="foregroundMuted">Label</InputLabel>;
};

export const InputLabelDangerouslySetClassName = () => {
  const fontWeight = css`
    font-weight: 900;
  `;

  return (
    <InputLabel color="foregroundMuted" dangerouslySetClassName={fontWeight}>
      Label
    </InputLabel>
  );
};
