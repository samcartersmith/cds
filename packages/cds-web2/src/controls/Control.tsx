import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { css, cx } from '@linaria/core';
import { useMergeRefs } from '@cbhq/cds-common2/hooks/useMergeRefs';
import { usePrefixedId } from '@cbhq/cds-common2/hooks/usePrefixedId';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { Box } from '../layout/Box';
import { Interactable, type InteractableBaseProps } from '../system/Interactable';
import { FilteredHTMLAttributes } from '../types';
import { Text } from '../typography/Text';
import { isRtl } from '../utils/isRtl';

const pointerStyle = css`
  &:not(:disabled),
  &:not(:read-only) {
    cursor: pointer;
  }
`;

const inputBaseStyle = css`
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.interactable};
`;

const interactableStyle = css`
  height: fit-content;
  width: fit-content;
  position: relative;
  @supports selector(:has(:focus-visible)) {
    &:has(:focus-visible) {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-bgPrimary);
      outline-offset: 1px;
    }
  }
  // turn off control input opacity for hidden control in interactable
  &:active,
  &:visited,
  &:focus,
  &:hover {
    > input:first-of-type {
      opacity: 0;
    }
  }
`;

export type ControlProps = FilteredHTMLAttributes<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value'
> &
  SharedProps;

type ControlInternalProps<T extends string> = {
  value?: T;
  label?: React.ReactNode;
  children: React.ReactNode;
} & ControlProps &
  Partial<
    Pick<InteractableBaseProps, 'background' | 'borderColor' | 'borderRadius' | 'borderWidth'>
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
    background,
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
  // Setup a11y IDs
  const [id1, id2] = usePrefixedId(['trigger', 'collapsible']);
  const labelId = useMemo(() => ariaLabelledby ?? id1, [ariaLabelledby, id1]);
  const inputId = useMemo(() => htmlProps.id ?? id2, [htmlProps.id, id2]);

  const internalInputRef = useRef<HTMLInputElement>();
  const inputRef = useMergeRefs(ref, internalInputRef);

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
        transparentWhileInactive
        as="div"
        background={background ?? (checked ? 'bgPrimary' : 'bg')}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        className={interactableStyle}
        disabled={disabled || readOnly}
        testID={testID ? `${testID}-parent` : undefined}
      >
        <input className={cx(inputBaseStyle, pointerStyle)} {...inputProps} />
        {children}
      </Interactable>
    ),
    [
      background,
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
      <label className={pointerStyle} htmlFor={inputId}>
        <Box alignItems="flex-start" flexDirection={isRtl() ? 'row-reverse' : 'row'} gap={1}>
          {/* If the control has label, the label's lineHeight doesn't match the icon size. We need to wrap the icon with a container that match the lineHeight of the label typography and center the icon inside the wrapper so that the icon will be aligned properly with the first line of the label text. */}
          <Box alignItems="center" height="var(--lineHeight-body)" role="presentation">
            {iconNode}
          </Box>
          <Text
            as="span"
            color={checked ? 'fg' : 'fgMuted'}
            disabled={disabled || readOnly}
            font="body"
            id={labelId}
          >
            {label}
          </Text>
        </Box>
      </label>
    ),
    [checked, disabled, iconNode, inputId, label, labelId, readOnly],
  );

  // If no label is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labelledby prop.
  return label ? InternalLabel : iconNode;
}) as <T extends string>(
  props: ControlInternalProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
