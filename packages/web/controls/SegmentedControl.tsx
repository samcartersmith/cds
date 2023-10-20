/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  Fragment,
  memo,
  useCallback,
  useId,
  useState,
} from 'react';
import { css } from 'linaria';
import { IconName, IconSize, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common';

import { useIconButtonStyles } from '../buttons/useIconButtonStyles';
import { Icon } from '../icons/Icon';
import { insetFocusRing } from '../styles/focus';
import { xSmallVariables } from '../styles/scale';
import { Interactable } from '../system';
import { borderRadius, palette, spacing } from '../tokens';
import { bodyStyles, headlineStyles } from '../typography/textStyles';
import { cx } from '../utils/linaria';

function SegmentedControlInternal(
  props: SegmentedControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { type, options, block, disabled, testID, onChange } = props;

  const [selectedValue, setSelectedValue] = useState(props.value);
  const name = useId();
  const heightVar = useIconButtonStyles();
  const vars = { '--width': block ? '100%' : 'max-content', ...heightVar };
  const size = type === 'icon' ? props.iconSize : 'l';

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <div ref={ref} className={containerStyle} style={vars}>
      {options.map(({ label, value, accessibilityLabel }) => (
        <Fragment key={value}>
          <input
            aria-label={accessibilityLabel}
            checked={selectedValue === value}
            className={cx(radioStyle, insetFocusRing)}
            data-testid={testID ? `${testID}-${value}` : undefined}
            disabled={disabled}
            id={`${name}-${value}`}
            name={name}
            onChange={handleChange}
            type="radio"
            value={value}
          />
          <Interactable
            as="label"
            backgroundColor="backgroundAlternate"
            className={labelStyle}
            disabled={disabled}
            htmlFor={`${name}-${value}`}
          >
            {/* Hidden label is used to mitigate resizing */}
            <Label hidden iconSize={size} option={label} type={type} />
            <Label iconSize={size} option={label} type={type} />
          </Interactable>
        </Fragment>
      ))}
    </div>
  );
}

type LabelProps = Pick<SegmentedControlProps, 'type'> & {
  option: SegmentedControlProps['options'][number]['label'];
  iconSize: IconSize;
  hidden?: boolean;
};

function Label({ type, option, iconSize, hidden }: LabelProps) {
  return (
    <span aria-hidden={hidden} className={cx(optionStyle, hidden && hiddenLabel)}>
      {type === 'icon' ? (
        <Icon color="currentColor" name={option as IconName} size={iconSize} />
      ) : (
        option
      )}
      <Icon name="checkmark" size="xs" />
    </span>
  );
}

export type SegmentedControlProps = {
  /** The selected value */
  value?: string;
  /** Expand to 100% of parent width */
  block?: boolean;
  /** Callback fired when an option is selected */
  onChange?: (value: string) => void;
  disabled?: boolean;
} & (TextOptionProps | IconOptionProps) &
  SharedProps;

export type TextOptions = readonly TextOption[];
export type IconOptions = readonly IconOption[];

type BaseOption = {
  /** The option value */
  value: string;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel'>;

type TextOption = {
  /** The option label to display in the control */
  label: string;
} & BaseOption;

type TextOptionProps = {
  type?: 'text';
  /** The options to render as an array of values and labels */
  options: TextOptions;
};

type IconOption = {
  /** The option icon to display in the control */
  label: IconName;
} & BaseOption;

type IconOptionProps = {
  type: 'icon';
  iconSize: IconSize;
  /** The options to render as an array of values and IconNames  */
  options: IconOptions;
};

// This is a bit risky, but more ideal than a fixed px value
const CHECKMARK_SIZE = xSmallVariables['--label2-font-size'];

const containerStyle = css`
  max-width: var(--width);
  position: relative;

  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 1px;

  border-radius: ${borderRadius.rounded};
`;

const labelStyle = css`
  height: var(--interactable-height);
  padding-left: ${CHECKMARK_SIZE};
  padding-right: ${CHECKMARK_SIZE};

  display: grid;
  position: relative;
`;

const hiddenLabel = css`
  && {
    opacity: 0;
    position: relative;
    pointer-events: none;
    user-select: none;

    ${headlineStyles};
  }
`;

const optionStyle = css`
  position: absolute;
  height: 100%;
  width: 100%;
  /* distribute gap half to both sides */
  padding-left: calc(${CHECKMARK_SIZE} + 2px);
  padding-right: calc(${CHECKMARK_SIZE} - 2px);

  display: flex;
  gap: ${spacing[1]};
  justify-content: center;
  align-items: center;

  color: ${palette.foregroundMuted};
  ${bodyStyles}

  /* checkmark */
  > :last-child {
    visibility: hidden;
    margin-right: -${CHECKMARK_SIZE};
  }
`;

const radioStyle = css`
  position: absolute;
  left: -9999em;

  &:first-of-type + label {
    border-top-left-radius: ${borderRadius.rounded};
    border-bottom-left-radius: ${borderRadius.rounded};
  }

  &:last-of-type + label {
    border-top-right-radius: ${borderRadius.rounded};
    border-bottom-right-radius: ${borderRadius.rounded};
  }

  &:checked + label {
    background-color: ${palette.primaryWash};

    > .${optionStyle} {
      /* distribute checkmark half to both sides */
      padding-left: calc(${CHECKMARK_SIZE} - ${CHECKMARK_SIZE} / 2);
      padding-right: calc(${CHECKMARK_SIZE} + ${CHECKMARK_SIZE} / 2);

      color: ${palette.primary};
      ${headlineStyles}

      /* checkmark */
      > :last-child {
        visibility: visible;
      }
    }
  }
`;

export const SegmentedControl = memo(forwardRef(SegmentedControlInternal));

SegmentedControl.displayName = 'SegmentedControl';
