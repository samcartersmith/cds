/* eslint-disable no-console */
import React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';

import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { borderRadius } from '../../styles/styles';
import { Link } from '../../text/Link';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';
import { NativeTextArea } from '../NativeTextArea';
import { type TextInputProps, TextInput } from '../TextInput';

export default {
  title: 'Core Components/Inputs/TextInput',
  component: TextInput,
};

const nativeInputCustomCSS = css`
  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  background-color: transparent;
`;

const variants = ['positive', 'negative', 'foregroundMuted'] as const;

const customContainerPaddingStyle = css`
  padding: var(--space-4);
`;

/**
 * DEFAULT TEXT INPUT VARIATIONS
 */

export const Basic = function Basic() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);

  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);

  return <TextInput label="Label" onBlur={onBlur} onFocus={onFocus} />;
};

export const Placeholder = function Placeholder() {
  return <TextInput label="Label" placeholder="placeholder" />;
};

export const HelperText = function HelperText() {
  return <TextInput helperText="helperText" label="Label" placeholder="placeholder" />;
};

export const Align = function Align() {
  const alignments = ['start', 'end'] as const;

  return (
    <>
      {alignments.map((align) => (
        <TextInput
          align={align}
          helperText="helperText"
          label={`Label: ${align}`}
          placeholder="placeholder"
        />
      ))}
    </>
  );
};

export const Variants = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          helperText="helperText"
          label={`Label: ${variant}`}
          placeholder="placeholder"
          variant={variant}
        />
      ))}
    </>
  );
};

export const ColorSurge = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          enableColorSurge
          helperText="helperText"
          label={`Label: ${variant}`}
          placeholder="placeholder"
          variant={variant}
        />
      ))}
    </>
  );
};

export const Width = function Width() {
  const widths = ['100%', '30%', '75%', '10%'] as const;

  return (
    <>
      {widths.map((width) => (
        <TextInput
          key={`input-width-${width}`}
          helperText="helperText"
          label={`Width: ${width}`}
          placeholder="placeholder"
          width={width}
        />
      ))}
    </>
  );
};

export const Height = function Height() {
  const heights = [56, 40];

  return (
    <>
      {heights.map((height) => (
        <TextInput
          key={`input-height-${height}`}
          height={height}
          helperText="helperText"
          label={`Height: ${height}`}
          placeholder="placeholder"
        />
      ))}
    </>
  );
};

export const BorderRadius = () =>
  Object.keys(borderRadius).map((localborderRadius) => (
    <TextInput
      key={`border-radius-${localborderRadius}`}
      borderRadius={Number(localborderRadius) as TextInputProps['borderRadius']}
      helperText="helperText"
      label={`BorderRadius: ${localborderRadius}`}
      placeholder="placeholder"
    />
  ));

export const Borderless = function Borderless() {
  return (
    <TextInput
      bordered={false}
      helperText="helperText"
      label="borderless"
      placeholder="placeholder"
    />
  );
};

export const Disabled = function Disabled() {
  return (
    <>
      <TextInput disabled label="Disabled label" />
      <TextInput
        disabled
        label="Label"
        start={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
      />
    </>
  );
};

Disabled.bind({});
Disabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const NoLabel = function NoLabel() {
  return <TextInput accessibilityLabel="No Label" />;
};

export const StartContent = function StartContent() {
  return (
    <TextInput
      label="Label"
      start={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
    />
  );
};

export const EndContent = function EndContent() {
  return (
    <TextInput
      end={
        <HStack paddingRight={1}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link font="headline" to="">
            Hello
          </Link>
        </HStack>
      }
      label="Label"
    />
  );
};

export const Suffix = function Suffix() {
  return <TextInput label="Label" suffix="USD" />;
};

export const SuffixAndEndContent = function SuffixAndEndContent() {
  return (
    <TextInput
      end={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
      label="Label"
      suffix="USD"
    />
  );
};

/**
 * COMPACT TEXT INPUT VARIATIONS
 */

export const CompactInput = function CompactInput() {
  return <TextInput compact label="Label" />;
};

export const CompactInputStart = function CompactInputStart() {
  return (
    <TextInput
      compact
      label="Label"
      start={
        <Box>
          <Avatar
            alt="address"
            size="l"
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
          />
        </Box>
      }
    />
  );
};

export const CompactInputEnd = function CompactInputEnd() {
  return (
    <TextInput
      compact
      end={
        <HStack paddingRight={1}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link font="headline" to="">
            Hello
          </Link>
        </HStack>
      }
      label="Label"
    />
  );
};

export const CompactInputSuffix = function CompactInputSuffix() {
  return <TextInput compact label="Label" suffix="USD" />;
};

export const CompactHelperText = function CompactHelperText() {
  return <TextInput compact helperText="helperText" label="Label" suffix="USD" />;
};

export const InputOnChange = function InputOnChange() {
  const [inputText, setInputText] = useState('Test');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div>
      <TextInput helperText={inputText} label="Label" onChange={onChange} />
    </div>
  );
};

export const RenderInputDefault = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCSS}
      onChange={onChange}
      style={{ width: '100%', borderRadius: borderRadius[200] }}
    />
  );

  return (
    <div>
      <TextInput ref={ref} helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

export const RenderInputDisabled = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCSS}
      onChange={onChange}
      style={{ width: '100%', borderRadius: borderRadius[200] }}
      value="Custom Input"
    />
  );

  return (
    <div>
      <TextInput ref={ref} disabled helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

RenderInputDisabled.bind({});
RenderInputDisabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const RenderInputCompact = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCSS}
      onChange={onChange}
      style={{ width: '100%', borderRadius: borderRadius[200] }}
    />
  );

  return (
    <div>
      <TextInput ref={ref} compact helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

export const RenderNativeTextArea = () => {
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);

  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none',
    } as const;
  }, []);

  return (
    <div>
      <TextInput
        helperText="Test"
        inputNode={
          <NativeTextArea
            cols={5}
            onChange={onChange}
            rows={7}
            style={customNativeTextAreaCSS}
            value={inputText}
          />
        }
        label="Label"
      />
    </div>
  );
};

export const RenderNativeTextAreaCustomSpacing = () => {
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);

  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none',
    } as const;
  }, []);

  return (
    <div>
      <TextInput
        helperText="Test"
        inputNode={
          <NativeTextArea
            cols={5}
            containerSpacing={customContainerPaddingStyle}
            onChange={onChange}
            rows={7}
            style={customNativeTextAreaCSS}
            value={inputText}
          />
        }
        label="Label"
      />
    </div>
  );
};

/**
 * COMPLEX INPUTS
 * These are inputs that people have requested. And I am building it
 * to prove that it can be done with our component.
 */

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'textPrimary',
  positive: 'textPositive',
  negative: 'textNegative',
  foreground: 'textForeground',
  foregroundMuted: 'textForegroundMuted',
  secondary: 'backgroundSecondary',
};

export const CopyTextInput = function CopyTextInput() {
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState<InputVariant>('foregroundMuted');

  const handleOnPress = useCallback(() => {
    setCopied(!copied);
    setVariant(copied ? 'foregroundMuted' : 'positive');
    console.log(variant);
  }, [copied, variant]);

  const handleOnChange = useCallback(() => {
    setVariant('foregroundMuted');
    setCopied(false);
  }, []);

  return (
    <div>
      <TextInput
        /* eslint-disable jsx-a11y/anchor-is-valid */
        end={
          <HStack>
            <Link color={variantColorMap[variant]} onClick={handleOnPress}>
              {copied ? 'copied' : 'copy'}
            </Link>
            <InputIcon name="visibleActive" />
          </HStack>
        }
        helperText="Warning: Something interesting"
        label="Label"
        onChange={handleOnChange}
        variant={variant}
      />
    </div>
  );
};

export const CustomStyle = function Align() {
  const customStyle = {
    backgroundColor: 'rgb(var(--gray10))',
  } as const;

  return (
    <TextInput
      align="end"
      helperText="helperText"
      label="Label"
      placeholder="placeholder"
      style={customStyle}
    />
  );
};

export const ReadOnly = function ReadOnly() {
  return (
    <VStack gap={1}>
      <TextInput readOnly label="Read-Only Label" value="Some text" />
      <TextInput
        readOnly
        helperText="Some helper text"
        label="Read-Only with HelperText"
        value="Some text"
      />
      <TextInput
        readOnly
        label="Read-Only with Start Node"
        start={
          <Box paddingX={2}>
            <Icon color="textForeground" name="qrCode" size="m" />
          </Box>
        }
        value="Some text"
      />
      <TextInput
        compact
        readOnly
        end={
          <Box paddingX={2}>
            <Icon color="textForeground" name="qrCode" size="m" />
          </Box>
        }
        label="Compact Read-Only with End Node"
        placeholder="Placeholder"
      />
    </VStack>
  );
};
