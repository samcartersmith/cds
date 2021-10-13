import { useState, useCallback } from 'react';
import { InputVariant } from '@cbhq/cds-common';
import { TextField } from '../TextField';
import { IconButton } from '../../buttons';
import { HStack } from '../../layout';
import { Link } from '../../typography';
import { Icon } from '../../icons';

/* eslint-disable no-console */

export default {
  title: 'Core Components/Inputs/TextField',
  component: TextField,
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

  return <TextField label="Label" onFocus={onFocus} onBlur={onBlur} />;
};

export const Placeholder = function Placeholder() {
  return <TextField label="Label" placeholder="placeholder" />;
};

export const HelperText = function HelperText() {
  return <TextField label="Label" placeholder="placeholder" helperText="helperText" />;
};

export const Align = function Align() {
  const alignments = ['start', 'end'] as const;

  return (
    <>
      {alignments.map((align) => (
        <TextField label="Label" placeholder="placeholder" helperText="helperText" align={align} />
      ))}
    </>
  );
};

export const Variants = function Variants() {
  const variants = ['positive', 'negative', 'foregroundMuted'] as const;

  return (
    <>
      {variants.map((variant) => (
        <TextField
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
  const widths = [100, 30, 75, 10] as const;

  return (
    <>
      {widths.map((width) => (
        <TextField
          key={`input-width-${width}%`}
          label={`Width: ${width}%`}
          placeholder="placeholder"
          helperText="helperText"
          width={width}
        />
      ))}
    </>
  );
};

export const Disabled = function Disabled() {
  return <TextField label="Label" disabled />;
};

export const StartContent = function StartContent() {
  return <TextField label="Label" start={<IconButton name="add" transparent />} />;
};

export const EndContent = function EndContent() {
  return (
    <TextField
      label="Label"
      end={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
    />
  );
};

export const Suffix = function Suffix() {
  return <TextField label="Label" suffix="USD" />;
};

export const SuffixAndEndContent = function SuffixAndEndContent() {
  return <TextField label="Label" suffix="USD" end={<IconButton name="add" transparent />} />;
};

/**
 * COMPACT TEXT INPUT VARIATIONS
 */

export const CompactInput = function CompactInput() {
  return <TextField label="Label" compact />;
};

export const CompactInputStart = function CompactInputStart() {
  return (
    <TextField
      label="Label"
      start={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link to="" variant="headline">
          Hello
        </Link>
      }
      compact
    />
  );
};

export const CompactInputEnd = function CompactInputEnd() {
  return (
    <TextField
      label="Label"
      end={
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
  return <TextField label="Label" suffix="USD" compact />;
};

export const CompactHelperText = function CompactHelperText() {
  return <TextField label="Label" suffix="USD" compact helperText="helperText" />;
};

export const InputOnChange = function InputOnChange() {
  const [inputText, setInputText] = useState('Test');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div>
      <TextField onChange={onChange} helperText={inputText} label="Label" />
    </div>
  );
};

/**
 * COMPLEX INPUTS
 * These are inputs that people have requested. And I am building it
 * to prove that it can be done with our component.
 */

export const CopyTextField = function CopyTextField() {
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
      <TextField
        /* eslint-disable jsx-a11y/anchor-is-valid */
        end={
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
