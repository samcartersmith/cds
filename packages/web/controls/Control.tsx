import React, { forwardRef, InputHTMLAttributes, memo, useRef } from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { isDevelopment } from '@cbhq/cds-utils';

import { Box, Spacer } from '../layout';
import { Interactable, InteractableProps } from '../system/Interactable';
import { FilteredHTMLAttributes } from '../types';
import { TextProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { isRtl } from '../utils/isRtl';
import { cx } from '../utils/linaria';

const pointer = css`
  &:not(:disabled),
  &:not(:read-only) {
    cursor: pointer;
  }
`;

const controlInput = css`
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.interactable};
`;

const interactableContainer = css`
  height: fit-content;
  width: fit-content;
`;

export type ControlProps = FilteredHTMLAttributes<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  SharedProps;

type ControlInternalProps<T extends string> = {
  value?: T;
  label?: TextProps['children'];
  children: React.ReactChild;
} & ControlProps &
  Partial<
    Pick<InteractableProps, 'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderWidth'>
  >;

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
    borderColor,
    borderRadius,
    borderWidth,
    testID,
    ...htmlProps
  }: ControlInternalProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  if (isDevelopment() && !children && !ariaLabelledby) {
    console.warn(
      `Please provide an aria label for the control component ${value} either through the children or aria-labelledby prop.`,
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
    'data-testid': testID,
    ...htmlProps,
  };

  const iconNode = (
    <Interactable
      as="div"
      backgroundColor={backgroundColor ?? (checked ? 'primary' : 'background')}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      disabled={disabled || readOnly}
      testID={testID ? `${testID}-parent` : undefined}
      transparentWhileInactive
      wrapWithLayeredElements
      className={interactableContainer}
    >
      <>
        <input className={cx(controlInput, pointer)} {...inputProps} />
        {children}
      </>
    </Interactable>
  );

  return label ? (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={pointer}>
      <Box alignItems="flex-start" flexDirection={isRtl() ? 'row-reverse' : 'row'}>
        {/* If the control has label, the label's lineHeight doesn't match the icon size. We need to wrap the icon with a container that match the lineHeight of the label typography and center the icon inside the wrapper so that the icon will be aligned properly with the first line of the label text. */}
        <Box role="presentation" aria-hidden height="var(--body-line-height)" alignItems="center">
          {iconNode}
        </Box>
        <Spacer horizontal={1} />
        <TextBody
          as="span"
          color={checked ? 'foreground' : 'foregroundMuted'}
          disabled={disabled || readOnly}
        >
          {label}
        </TextBody>
      </Box>
    </label>
  ) : (
    // If no label (children) is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labelledby prop.
    iconNode
  );
}) as <T extends string>(
  props: ControlInternalProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
