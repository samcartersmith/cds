import { useCallback } from 'react';

import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

export default {
  title: 'Core Components/Inputs/NativeInput',
  component: NativeInput,
};

export const NativeInputBasic = function NativeInputBasic() {
  return <InputStack inputNode={<NativeInput accessibilityLabel="Label" />} labelNode="Label" />;
};

export const NativeInputCustomContainerSpacing = function NativeInputCustomContainerSpacing() {
  const defaultContainerSpacing = useSpacingStyles({
    spacingHorizontal: 1,
    spacingVertical: 1,
  });

  return (
    <InputStack
      inputNode={
        <NativeInput accessibilityLabel="Label" containerSpacing={defaultContainerSpacing} />
      }
      labelNode="Label"
    />
  );
};

export const NativeInputTextAlign = function NativeInputTextAlign() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <div>
      {textAlignments.map((align) => (
        <InputStack
          inputNode={
            <NativeInput
              accessibilityLabel="Label"
              align={align}
              placeholder={`${align}-placeholder`}
            />
          }
          labelNode="Label"
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
      inputNode={
        <NativeInput
          accessibilityLabel="Label"
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onPress={onPress}
        />
      }
      labelNode="Label"
    />
  );
};
