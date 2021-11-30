import { useState, useCallback } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { TextInput } from '../TextInput';
import { HStack } from '../../layout';
import { Link } from '../../typography';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';

/* eslint-disable no-console */

export default {
  title: 'Core Components/Inputs/TextInput',
  component: TextInput,
};

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
        <TextInput label="Label" placeholder="placeholder" helperText="helperText" align={align} />
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
          label="Label"
          placeholder="placeholder"
          helperText="helperText"
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
          label={`Width: ${width}`}
          placeholder="placeholder"
          helperText="helperText"
          width={width}
        />
      ))}
    </>
  );
};

export const Disabled = function Disabled() {
  return <TextInput label="Label" disabled />;
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
