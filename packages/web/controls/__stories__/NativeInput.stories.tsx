import { useCallback } from 'react';

import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

export default {
  title: 'Core Components/Inputs/NativeInput',
  component: NativeInput,
};

export const NativeInputBasic = function NativeInputBasic() {
  return <InputStack labelNode="Label" inputNode={<NativeInput />} />;
};

export const NativeInputCustomContainerSpacing = function NativeInputCustomContainerSpacing() {
  const defaultContainerSpacing = useSpacingStyles({
    spacingHorizontal: 1,
    spacingVertical: 1,
  });

  return (
    <InputStack
      labelNode="Label"
      inputNode={<NativeInput containerSpacing={defaultContainerSpacing} />}
    />
  );
};

export const NativeInputTextAlign = function NativeInputTextAlign() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <div>
      {textAlignments.map((align) => (
        <InputStack
          labelNode="Label"
          inputNode={<NativeInput placeholder={`${align}-placeholder`} align={align} />}
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
    <InputStack
      labelNode="Label"
      inputNode={
        <NativeInput onKeyDown={onKeyDown} onPress={onPress} onFocus={onFocus} onBlur={onBlur} />
      }
    />
  );
};
