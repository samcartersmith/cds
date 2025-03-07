import React from 'react';
import { useCallback } from 'react';
import { css } from '@linaria/core';

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
  return (
    <InputStack
      inputNode={
        <NativeInput
          accessibilityLabel="Label"
          containerSpacing={css`
            padding: var(--space-1);
          `}
        />
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
    // eslint-disable-next-line no-console
    console.log('Focusing');
  }, []);

  const onBlur = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Blurring');
  }, []);

  const onKeyDown = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Key down');
  }, []);

  const onClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Clicked');
  }, []);

  return (
    <InputStack
      inputNode={
        <NativeInput
          accessibilityLabel="Label"
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />
      }
      labelNode="Label"
    />
  );
};
