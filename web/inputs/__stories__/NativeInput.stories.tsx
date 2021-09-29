import { css } from 'linaria';
import { useCallback } from 'react';
import { NativeInput } from '../NativeInput';
import { Input } from '../Input';
import { useSpacingStyles } from '../../hooks/useSpacingStyles';

/* eslint-disable no-console */

export default {
  title: 'Core Components/Inputs/NativeInput',
  component: NativeInput,
};

const borderStyle = css`
  border-width: 1px;
`;

export const NativeInputBasic = function NativeInputBasic() {
  return <Input borderStyle={borderStyle} label="Label" input={<NativeInput />} />;
};

export const NativeInputCustomContainerSpacing = function NativeInputCustomContainerSpacing() {
  const defaultContainerSpacing = useSpacingStyles({
    spacingHorizontal: 1,
    spacingVertical: 1,
  });

  return (
    <Input
      borderStyle={borderStyle}
      label="Label"
      input={<NativeInput containerSpacing={defaultContainerSpacing} />}
    />
  );
};

export const NativeInputTextAlign = function NativeInputTextAlign() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <div>
      {textAlignments.map((align) => (
        <Input
          borderStyle={borderStyle}
          label="Label"
          input={<NativeInput placeholder={`${align}-placeholder`} align={align} />}
        />
      ))}
    </div>
  );
};

export const NativeInputActions = function NativeInputOnFocus() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);

  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);

  const onKeyDown = useCallback(() => {
    console.log('Key down');
  }, []);

  const onPress = useCallback(() => {
    console.log('Pressed');
  }, []);

  return (
    <Input
      borderStyle={borderStyle}
      label="Label"
      input={
        <NativeInput onKeyDown={onKeyDown} onPress={onPress} onFocus={onFocus} onBlur={onBlur} />
      }
    />
  );
};
