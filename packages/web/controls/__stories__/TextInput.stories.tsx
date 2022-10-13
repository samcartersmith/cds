import { useCallback, useMemo, useRef, useState } from 'react';
import { css } from 'linaria';
import { InputVariant } from '@cbhq/cds-common';

import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { Box, HStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { borderRadius } from '../../tokens';
import { Link } from '../../typography';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';
import { NativeTextArea } from '../NativeTextArea';
import { TextInput } from '../TextInput';

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

  return <TextInput label="Label" onFocus={onFocus} onBlur={onBlur} />;
};

export const Placeholder = function Placeholder() {
  return <TextInput label="Label" placeholder="placeholder" />;
};

export const HelperText = function HelperText() {
  return <TextInput label="Label" placeholder="placeholder" helperText="helperText" />;
};

export const Align = function Align() {
  const alignments = ['start', 'end'] as const;

  return (
    <>
      {alignments.map((align) => (
        <TextInput
          label={`Label: ${align}`}
          placeholder="placeholder"
          helperText="helperText"
          align={align}
        />
      ))}
    </>
  );
};

export const Variants = function Variants() {
  const variants = ['positive', 'negative', 'foregroundMuted'] as const;

  return (
    <>
      {variants.map((variant) => (
        <TextInput
          label={`Label: ${variant}`}
          placeholder="placeholder"
          helperText="helperText"
          variant={variant}
        />
      ))}
    </>
  );
};

export const ColorSurge = function ColorSurge() {
  const variants = ['positive', 'negative', 'foregroundMuted'] as const;

  return (
    <>
      {variants.map((variant) => (
        <TextInput
          label={`Label: ${variant}`}
          placeholder="placeholder"
          helperText="helperText"
          variant={variant}
          enableColorSurge
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
          label={`Width: ${width}`}
          placeholder="placeholder"
          helperText="helperText"
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
          label={`Height: ${height}`}
          placeholder="placeholder"
          helperText="helperText"
          height={height}
        />
      ))}
    </>
  );
};

export const BorderRadius = function BorderRadius() {
  const borderRadiuses = ['input', 'search'] as const;

  return (
    <>
      {borderRadiuses.map((localborderRadius) => (
        <TextInput
          key={`border-radius-${localborderRadius}`}
          label={`BorderRadius: ${localborderRadius}`}
          placeholder="placeholder"
          helperText="helperText"
          borderRadius={localborderRadius}
        />
      ))}
    </>
  );
};

export const Borderless = function Borderless() {
  return (
    <TextInput
      label="borderless"
      placeholder="placeholder"
      helperText="helperText"
      bordered={false}
    />
  );
};

export const Disabled = function Disabled() {
  return (
    <>
      <TextInput label="Disabled label" disabled />
      <TextInput label="Label" start={<InputIconButton name="add" transparent />} disabled />
    </>
  );
};

export const NoLabel = function NoLabel() {
  return <TextInput accessibilityLabel="No Label" />;
};

export const StartContent = function StartContent() {
  return <TextInput label="Label" start={<InputIconButton name="add" transparent />} />;
};

export const EndContent = function EndContent() {
  return (
    <TextInput
      label="Label"
      end={
        <HStack spacingEnd={1}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="" variant="headline">
            Hello
          </Link>
        </HStack>
      }
    />
  );
};

export const Suffix = function Suffix() {
  return <TextInput label="Label" suffix="USD" />;
};

export const SuffixAndEndContent = function SuffixAndEndContent() {
  return <TextInput label="Label" suffix="USD" end={<InputIconButton name="add" transparent />} />;
};

/**
 * COMPACT TEXT INPUT VARIATIONS
 */

export const CompactInput = function CompactInput() {
  return <TextInput label="Label" compact />;
};

export const CompactInputStart = function CompactInputStart() {
  return (
    <TextInput
      label="Label"
      start={
        <Box>
          <Avatar
            size="l"
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
            alt="address"
          />
        </Box>
      }
      compact
    />
  );
};

export const CompactInputEnd = function CompactInputEnd() {
  return (
    <TextInput
      label="Label"
      end={
        <HStack spacingEnd={1}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="" variant="headline">
            Hello
          </Link>
        </HStack>
      }
      compact
    />
  );
};

export const CompactInputSuffix = function CompactInputSuffix() {
  return <TextInput label="Label" suffix="USD" compact />;
};

export const CompactHelperText = function CompactHelperText() {
  return <TextInput label="Label" suffix="USD" compact helperText="helperText" />;
};

export const InputOnChange = function InputOnChange() {
  const [inputText, setInputText] = useState('Test');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div>
      <TextInput onChange={onChange} helperText={inputText} label="Label" />
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
      style={{ width: '100%', borderRadius: borderRadius.input }}
      onChange={onChange}
    />
  );

  return (
    <div>
      <TextInput ref={ref} inputNode={renderInput} helperText={inputText} label="Label" />
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
      style={{ width: '100%', borderRadius: borderRadius.input }}
      onChange={onChange}
      value="Custom Input"
    />
  );

  return (
    <div>
      <TextInput ref={ref} disabled inputNode={renderInput} helperText={inputText} label="Label" />
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
      style={{ width: '100%', borderRadius: borderRadius.input }}
      onChange={onChange}
    />
  );

  return (
    <div>
      <TextInput ref={ref} compact inputNode={renderInput} helperText={inputText} label="Label" />
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
        inputNode={
          <NativeTextArea
            value={inputText}
            onChange={onChange}
            style={customNativeTextAreaCSS}
            rows={7}
            cols={5}
          />
        }
        helperText="Test"
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

  const customContainerSpacing = useSpacingStyles({
    spacing: 4,
  });

  return (
    <div>
      <TextInput
        inputNode={
          <NativeTextArea
            value={inputText}
            onChange={onChange}
            containerSpacing={customContainerSpacing}
            style={customNativeTextAreaCSS}
            rows={7}
            cols={5}
          />
        }
        helperText="Test"
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
            <Link onPress={handleOnPress} color={variant}>
              {copied ? 'copied' : 'copy'}
            </Link>
            <InputIcon name="visibleActive" />
          </HStack>
        }
        onChange={handleOnChange}
        variant={variant}
        helperText="Warning: Something interesting"
        label="Label"
      />
    </div>
  );
};
