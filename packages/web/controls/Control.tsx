import React, { forwardRef, InputHTMLAttributes, memo, useMemo, useRef } from 'react';
import { css } from 'linaria';
import { SharedProps } from '@cbhq/cds-common';
import { useMergedRef } from '@cbhq/cds-common/hooks/useMergedRef';
import { usePrefixedId } from '@cbhq/cds-common/hooks/usePrefixedId';
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
  position: relative;

  // turn off control input opacity for hidden control in interactable
  &:active,
  &:visited,
  &:focus,
  &:hover {
    .${controlInput} {
      opacity: 0;
    }
  }
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
    // eslint-disable-next-line no-console
    console.warn(
      `Please provide an aria label for the control component ${value} either through the children or aria-labelledby prop.`,
    );
  }
  // Setup a11y IDs
  const [id1, id2] = usePrefixedId(['trigger', 'collapsible']);
  const labelId = useMemo(() => ariaLabelledby ?? id1, [ariaLabelledby, id1]);
  const inputId = useMemo(() => htmlProps.id ?? id2, [htmlProps.id, id2]);

  const internalInputRef = useRef<HTMLInputElement>();
  const inputRef = useMergedRef(ref, internalInputRef);

  const inputProps = useMemo(
    () => ({
      ref: inputRef,
      type,
      checked,
      disabled,
      readOnly,
      required,
      value,
      id: inputId,
      'aria-labelledby': labelId,
      'aria-checked': checked,
      'aria-required': type !== 'checkbox' ? required : undefined,
      'data-testid': testID,
      ...htmlProps,
    }),
    [
      checked,
      disabled,
      htmlProps,
      inputId,
      inputRef,
      labelId,
      readOnly,
      required,
      testID,
      type,
      value,
    ],
  );

  const iconNode = useMemo(
    () => (
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
    ),
    [
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      checked,
      children,
      disabled,
      inputProps,
      readOnly,
      testID,
    ],
  );
  const InternalLabel = useMemo(
    () => (
      <label className={pointer} htmlFor={inputId}>
        <Box alignItems="flex-start" flexDirection={isRtl() ? 'row-reverse' : 'row'}>
          {/* If the control has label, the label's lineHeight doesn't match the icon size. We need to wrap the icon with a container that match the lineHeight of the label typography and center the icon inside the wrapper so that the icon will be aligned properly with the first line of the label text. */}
          <Box role="presentation" height="var(--body-line-height)" alignItems="center">
            {iconNode}
          </Box>
          <Spacer horizontal={1} />
          <TextBody
            as="span"
            color={checked ? 'foreground' : 'foregroundMuted'}
            disabled={disabled || readOnly}
            id={labelId}
          >
            {label}
          </TextBody>
        </Box>
      </label>
    ),
    [checked, disabled, iconNode, inputId, label, labelId, readOnly],
  );

  // If no label (children) is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labelledby prop.
  return label ? InternalLabel : iconNode;
}) as <T extends string>(
  props: ControlInternalProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
