/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { InputVariant } from '@cbhq/cds-common/types';
import { Button, ButtonGroup } from '@cbhq/cds-web/buttons';
import { InputIcon } from '@cbhq/cds-web/controls/InputIcon';
import { InputIconButton } from '@cbhq/cds-web/controls/InputIconButton';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { Box, HStack, VStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { Link } from '@cbhq/cds-web/typography/Link';

export const TextInputSheet = () => {
  return (
    <ThemeProvider>
      <VStack gap={3} width="80%">
        <TextInput
          label="Default TextInput"
          placeholder="Input text"
          helperText="Assistive Message"
        />
        <TextInput
          compact
          label="Compact Textinput"
          placeholder="Input text"
          helperText="Assistive Message"
        />
      </VStack>
    </ThemeProvider>
  );
};

export const SignUpForm = () => {
  return (
    <ThemeProvider>
      <HStack gap={2} alignItems="center">
        <TextInput
          label="Email"
          placeholder="satoshi@nakamoto.com"
          helperText="Please enter a valid email address"
        />
        <Box spacingTop={0.5}>
          <Button variant="primary">Submit</Button>
        </Box>
      </HStack>
    </ThemeProvider>
  );
};

export const FormInputsExample = () => {
  const gap = 3;

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(e.currentTarget.nodeValue);
    // eslint-disable-next-line no-alert
    alert('Submitted');
  }, []);

  return (
    <ThemeProvider>
      <form onSubmit={onSubmit} action={undefined}>
        <VStack gap={gap}>
          <TextInput
            label="Street address"
            placeholder="4321 Jade Palace"
            helperText="Please enter your primary address."
          />
          <TextInput label="Unit #" aria-required="true" />
          <HStack gap={gap}>
            <TextInput label="City/town" width="70%" />
            <TextInput label="State" width="30%" />
          </HStack>
          <HStack gap={gap}>
            <TextInput label="Postal code" width="40%" />
            <TextInput label="Country" width="60%" />
          </HStack>
          <ButtonGroup accessibilityLabel="Save form">
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </VStack>
      </form>
    </ThemeProvider>
  );
};

export const NormalInput = () => {
  return (
    <TextInput
      label="API Access Token"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      end={
        <Box spacingEnd={2}>
          <Link variant="caption" color="primary" to="">
            COPY
          </Link>
        </Box>
      }
    />
  );
};

export const CompactInput = () => {
  return (
    <TextInput
      compact
      type="number"
      step="0.01"
      label="Amount"
      placeholder="8293323.23"
      suffix="USD"
    />
  );
};

export const Placeholder = () => {
  return <TextInput label="Label" placeholder="Placeholder" />;
};

export const Informational = () => {
  return <TextInput label="Label" helperText="Assitive message" value="Input text" />;
};

export const DefaultSentiment = () => {
  return (
    <TextInput
      label="Campaign title"
      placeholder="Title"
      helperText="This won't be displayed to user"
    />
  );
};

export const Success = () => {
  return (
    <TextInput
      enableColorSurge
      label="Label"
      variant="positive"
      helperText="Positive message"
      value="Input text"
    />
  );
};

export const PositiveSentiment = () => {
  return (
    <TextInput
      label="Address"
      helperText="Valid BTC address"
      variant="positive"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      end={<InputIcon color="positive" name="visibleActive" />}
    />
  );
};

export const Error = () => {
  return (
    <TextInput
      label="Address"
      variant="negative"
      helperText="Negative message"
      value="HaeJiWplJohn6W42eCq0Qqft0"
      enableColorSurge
    />
  );
};
export const NegativeSentiment = () => {
  return (
    <TextInput
      label="Address"
      helperText="Invalid BTC address"
      variant="negative"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      end={<InputIcon color="negative" name="visibleActive" />}
    />
  );
};

export const LeftAlignInput = () => {
  return <TextInput label="City/town" placeholder="Oakland" />;
};

export const RightAlignInput = () => {
  return (
    <TextInput
      label="Limit price"
      compact
      align="end"
      type="number"
      step="0.01"
      placeholder="29.3"
      suffix="USD"
    />
  );
};

export const AssetStartContent = () => {
  return (
    <TextInput
      label="Address"
      start={
        <Box spacingHorizontal={2}>
          <Avatar
            size="l"
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
            alt="address"
          />
        </Box>
      }
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
    />
  );
};

export const IconStartContent = () => {
  return <TextInput label="Amount" start={<InputIcon name="cashUSD" />} placeholder="1234" />;
};

export const IconButtonStartContent = () => {
  return (
    <TextInput
      label="Search"
      start={<InputIconButton name="search" />}
      placeholder="Search for anything"
    />
  );
};

export const SuffixInput = () => {
  return (
    <TextInput
      label="Amount"
      type="number"
      step="0.01"
      compact
      placeholder="98329.23"
      suffix="USD"
    />
  );
};

export const TextButtonInput = () => {
  return (
    <TextInput
      label="API Access Token"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      end={
        <Box spacingEnd={2}>
          <Link variant="caption" color="primary" to="">
            COPY
          </Link>
        </Box>
      }
    />
  );
};

export const IconButtonEndContent = () => {
  return (
    <TextInput label="Asset name" end={<InputIconButton name="close" />} placeholder="Dodge" />
  );
};

export const AddressEndContent = () => {
  return (
    <TextInput
      label="Address"
      placeholder="1234 Abc Way"
      end={<InputIcon name="checkmark" color="positive" />}
    />
  );
};

export const PasswordInput = () => {
  const [isVisible, { toggle: toggleIsVisible }] = useToggler();
  const [type, setType] = useState('text');

  useEffect(() => {
    setType(isVisible ? 'text' : 'password');
  }, [isVisible]);

  const handleOnPress = useCallback(() => {
    toggleIsVisible();
  }, [toggleIsVisible]);

  return (
    <TextInput
      label="Password"
      type={type}
      end={
        <InputIconButton
          name={isVisible ? 'visibleActive' : 'visibleInactive'}
          onPress={handleOnPress}
        />
      }
      size={30}
    />
  );
};

export function CopyTextInputExample() {
  const [copied, { toggleOff: toggleCopiedOff, toggle: toggleCopied }] = useToggler();
  const [variant, setVariant] = useState<InputVariant>('foregroundMuted');
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (copied) {
      setVariant('positive');
      setHelperText('Your token has been copied!');
    } else {
      setVariant('foregroundMuted');
      setHelperText('');
    }
  }, [copied]);

  const handleOnCopy = useCallback(() => {
    toggleCopied();
  }, [toggleCopied]);

  const handleOnChange = useCallback(() => {
    setVariant('foregroundMuted');
    toggleCopiedOff();
    setHelperText('');
  }, [toggleCopiedOff]);

  return (
    <TextInput
      end={
        <HStack>
          <Link onPress={handleOnCopy} variant="caption" color={variant}>
            {copied ? 'copied' : 'copy'}
          </Link>
          <InputIcon color="primary" name="visibleActive" />
        </HStack>
      }
      onChange={handleOnChange}
      variant={variant}
      helperText={helperText}
      label="API Access Token"
    />
  );
}

export const AvatarInput = () => {
  const avatarImageUrl =
    'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

  return (
    <TextInput
      start={
        <Box spacingHorizontal={2}>
          <Avatar alt="profile picture" src={avatarImageUrl} size="m" />
        </Box>
      }
      label="email"
      placeholder="brian@coinbase.com"
      helperText="Please enter a valid email address"
    />
  );
};
