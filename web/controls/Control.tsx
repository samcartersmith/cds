import React, { forwardRef, InputHTMLAttributes, memo, useRef } from 'react';

import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { isDevelopment } from '@cbhq/cds-utils';

import { Box, Spacer } from '../layout';
import { visuallyHidden } from '../styles/visuallyHidden';
import { Interactable } from '../system/Interactable';
import { FilteredHTMLAttributes } from '../types';
import { TextProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { isRtl } from '../utils/isRtl';

export interface ControlProps<T extends string>
  extends FilteredHTMLAttributes<InputHTMLAttributes<HTMLInputElement>> {
  label?: TextProps['children'];
  value?: T;
  children: React.ReactChild;
  // checkbox only
  indeterminate?: boolean;
}

const ControlWithRef = forwardRef(function ControlWithRef<T extends string>(
  {
    type,
    checked = false,
    indeterminate,
    disabled = false,
    readOnly = false,
    required = false,
    value,
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    ...htmlProps
  }: ControlProps<T>,

  ref: React.ForwardedRef<HTMLInputElement>
) {
  if (isDevelopment() && !children && !ariaLabelledby) {
    console.warn(
      `Please provide an aria label for the checkbox ${value} either through the children or aria-labelledby prop.`
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
    'aria-checked': indeterminate ? ('mixed' as const) : checked,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-required': required,
    ...htmlProps,
  };

  React.useEffect(() => {
    // indeterminate is a property, but it can only be set via javascript
    // https://css-tricks.com/indeterminate-checkboxes/
    if (internalInputRef && internalInputRef.current && indeterminate !== undefined) {
      internalInputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // TODO: use spacing layout component to add gap in between
  const iconNode = (
    <Interactable
      as="span"
      backgroundColor={checked ? 'primary' : 'background'}
      disabled={disabled || readOnly}
      borderRadius={type === 'radio' ? 'round' : undefined}
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
      color={(checked || indeterminate) && !disabled ? 'foreground' : 'foregroundMuted'}
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
  props: ControlProps<T> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
