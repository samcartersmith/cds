import React, { forwardRef, InputHTMLAttributes, memo, useRef } from 'react';

import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { isDevelopment } from '@cbhq/cds-utils';

import { Box, Spacer } from '../layout';
import { visuallyHidden } from '../styles/visuallyHidden';
import { Interactable, InteractableProps } from '../system/Interactable';
import { FilteredHTMLAttributes } from '../types';
import { TextProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { isRtl } from '../utils/isRtl';

export interface ControlProps
  extends FilteredHTMLAttributes<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  /** Used to locate this element in end-to-end tests. */
  testID?: string;
}

interface ControlInternalProps<T extends string> extends ControlProps {
  value?: T;
  label?: TextProps['children'];
  children: React.ReactChild;
  backgroundColor?: InteractableProps['backgroundColor'];
  borderRadius?: InteractableProps['borderRadius'];
}

const ControlWithRef = forwardRef(function ControlWithRef<T extends string>(
  {
    type,
    checked = false,
    disabled = false,
    readOnly = false,
    required = false,
    value,
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    backgroundColor,
    borderRadius,
    testID,
    ...htmlProps
  }: ControlInternalProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  if (isDevelopment() && !children && !ariaLabelledby) {
    console.warn(
      `Please provide an aria label for the control component ${value} either through the children or aria-labelledby prop.`
    );
  }
  const internalInputRef = useRef<HTMLInputElement>();
  const inputRef = useMergedRef(ref, internalInputRef);

  const inputProps = {
    ref: inputRef,
    type,
    checked,
    disabled,
    readOnly,
    required,
    value,
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-required': required,
    'data-test-id': testID,
    ...htmlProps,
  };

  // TODO: use spacing layout component to add gap in between
  const iconNode = (
    <Interactable
      as="span"
      backgroundColor={backgroundColor ?? (checked ? 'primary' : 'background')}
      disabled={disabled || readOnly}
      borderRadius={borderRadius}
    >
      <>
        <input className={visuallyHidden} {...inputProps} />
        {children}
      </>
    </Interactable>
  );

  return label ? (
    <TextBody
      as="label"
      color={checked && !disabled ? 'foreground' : 'foregroundMuted'}
      disabled={disabled}
    >
      <Box alignItems="center" flexDirection={isRtl() ? 'row-reverse' : 'row'}>
        {iconNode}
        <Spacer horizontal={1} />
        {label}
      </Box>
    </TextBody>
  ) : (
    // If no label (children) is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labellby prop.
    iconNode
  );
}) as <T extends string>(
  props: ControlInternalProps<T> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
