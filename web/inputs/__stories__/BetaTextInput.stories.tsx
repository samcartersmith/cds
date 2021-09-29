import { useState, useCallback } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { BetaTextInput } from '../BetaTextInput';
import { IconButton } from '../../buttons';
import { HStack } from '../../layout';
import { Link } from '../../typography';
import { Icon } from '../../icons';

/* eslint-disable no-console */

export default {
  title: 'Core Components/Inputs/BetaTextInput',
  component: BetaTextInput,
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

  return <BetaTextInput label="Label" onFocus={onFocus} onBlur={onBlur} />;
};

export const Placeholder = function Placeholder() {
  return <BetaTextInput label="Label" placeholder="placeholder" />;
};

export const HelperText = function HelperText() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <>
      {textAlignments.map((textAlign) => (
        <BetaTextInput
          label="Label"
          placeholder="placeholder"
          helperText="helperText"
          textAlignHelperText={textAlign}
        />
      ))}
    </>
  );
};

export const AlignInput = function AlignInput() {
  const textAlignments = ['start', 'end'] as const;

  return (
    <>
      {textAlignments.map((textAlign) => (
        <BetaTextInput
          label="Label"
          placeholder="placeholder"
          helperText="helperText"
          textAlignInput={textAlign}
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
        <BetaTextInput
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
        <BetaTextInput
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
  return <BetaTextInput label="Label" disabled />;
};

export const StartContent = function StartContent() {
  return <BetaTextInput label="Label" startContent={<IconButton name="add" transparent />} />;
};

export const EndContent = function EndContent() {
  return (
    <BetaTextInput
      label="Label"
      endContent={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
    />
  );
};

export const Suffix = function Suffix() {
  return <BetaTextInput label="Label" suffix="USD" />;
};

export const SuffixAndEndContent = function SuffixAndEndContent() {
  return (
    <BetaTextInput label="Label" suffix="USD" endContent={<IconButton name="add" transparent />} />
  );
};

/**
 * COMPACT TEXT INPUT VARIATIONS
 */

export const CompactInput = function CompactInput() {
  return <BetaTextInput label="Label" compact />;
};

export const CompactInputStartContent = function CompactInputStartContent() {
  return (
    <BetaTextInput
      label="Label"
      startContent={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      compact
    />
  );
};

export const CompactInputEndContent = function CompactInputEndContent() {
  return (
    <BetaTextInput
      label="Label"
      endContent={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      compact
    />
  );
};

export const CompactInputSuffix = function CompactInputSuffix() {
  return <BetaTextInput label="Label" suffix="USD" compact />;
};

export const CompactHelperText = function CompactHelperText() {
  return <BetaTextInput label="Label" suffix="USD" compact helperText="helperText" />;
};

export const InputOnChange = function InputOnChange() {
  const [inputText, setInputText] = useState('Test');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div>
      <BetaTextInput onChange={onChange} helperText={inputText} label="Label" />
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

  // const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputText(e.target.value);
  // }, []);

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
      <BetaTextInput
        /* eslint-disable jsx-a11y/anchor-is-valid */
        endContent={
          <HStack>
            <Link onPress={handleOnPress} color={variant}>
              {copied ? 'copied' : 'copy'}
            </Link>
            <Icon spacingHorizontal={1} color="primary" name="visibleActive" size="m" />
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
