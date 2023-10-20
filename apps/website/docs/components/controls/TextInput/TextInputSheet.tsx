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
          helperText="Assistive Message"
          label="Default TextInput"
          placeholder="Input text"
        />
        <TextInput
          compact
          helperText="Assistive Message"
          label="Compact Textinput"
          placeholder="Input text"
        />
      </VStack>
    </ThemeProvider>
  );
};

export const SignUpForm = () => {
  return (
    <ThemeProvider>
      <HStack alignItems="center" gap={2}>
        <TextInput
          helperText="Please enter a valid email address"
          label="Email"
          placeholder="satoshi@nakamoto.com"
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
      <form action={undefined} onSubmit={onSubmit}>
        <VStack gap={gap}>
          <TextInput
            helperText="Please enter your primary address."
            label="Street address"
            placeholder="4321 Jade Palace"
          />
          <TextInput aria-required="true" label="Unit #" />
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
      end={
        <Box spacingEnd={2}>
          <Link color="primary" to="" variant="caption">
            COPY
          </Link>
        </Box>
      }
      label="API Access Token"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
    />
  );
};

export const CompactInput = () => {
  return (
    <TextInput
      compact
      label="Amount"
      placeholder="8293323.23"
      step="0.01"
      suffix="USD"
      type="number"
    />
  );
};

export const Placeholder = () => {
  return <TextInput label="Label" placeholder="Placeholder" />;
};

export const Informational = () => {
  return <TextInput helperText="Assitive message" label="Label" value="Input text" />;
};

export const DefaultSentiment = () => {
  return (
    <TextInput
      helperText="This won't be displayed to user"
      label="Campaign title"
      placeholder="Title"
    />
  );
};

export const Success = () => {
  return (
    <TextInput
      enableColorSurge
      helperText="Positive message"
      label="Label"
      value="Input text"
      variant="positive"
    />
  );
};

export const PositiveSentiment = () => {
  return (
    <TextInput
      end={<InputIcon color="positive" name="visibleActive" />}
      helperText="Valid BTC address"
      label="Address"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      variant="positive"
    />
  );
};

export const Error = () => {
  return (
    <TextInput
      enableColorSurge
      helperText="Negative message"
      label="Address"
      value="HaeJiWplJohn6W42eCq0Qqft0"
      variant="negative"
    />
  );
};
export const NegativeSentiment = () => {
  return (
    <TextInput
      end={<InputIcon color="negative" name="visibleActive" />}
      helperText="Invalid BTC address"
      label="Address"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      variant="negative"
    />
  );
};

export const LeftAlignInput = () => {
  return <TextInput label="City/town" placeholder="Oakland" />;
};

export const RightAlignInput = () => {
  return (
    <TextInput
      compact
      align="end"
      label="Limit price"
      placeholder="29.3"
      step="0.01"
      suffix="USD"
      type="number"
    />
  );
};

export const AssetStartContent = () => {
  return (
    <TextInput
      label="Address"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
      start={
        <Box spacingHorizontal={2}>
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

export const IconStartContent = () => {
  return <TextInput label="Amount" placeholder="1234" start={<InputIcon name="cashUSD" />} />;
};

export const IconButtonStartContent = () => {
  return (
    <TextInput
      label="Search"
      placeholder="Search for anything"
      start={<InputIconButton name="search" />}
    />
  );
};

export const SuffixInput = () => {
  return (
    <TextInput
      compact
      label="Amount"
      placeholder="98329.23"
      step="0.01"
      suffix="USD"
      type="number"
    />
  );
};

export const TextButtonInput = () => {
  return (
    <TextInput
      end={
        <Box spacingEnd={2}>
          <Link color="primary" to="" variant="caption">
            COPY
          </Link>
        </Box>
      }
      label="API Access Token"
      placeholder="HaeJiWplJohn6W42eCq0Qqft0"
    />
  );
};

export const IconButtonEndContent = () => {
  return (
    <TextInput end={<InputIconButton name="close" />} label="Asset name" placeholder="Dodge" />
  );
};

export const AddressEndContent = () => {
  return (
    <TextInput
      end={<InputIcon color="positive" name="checkmark" />}
      label="Address"
      placeholder="1234 Abc Way"
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
      end={
        <InputIconButton
          name={isVisible ? 'visibleActive' : 'visibleInactive'}
          onPress={handleOnPress}
        />
      }
      label="Password"
      size={30}
      type={type}
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
          <Link color={variant} onPress={handleOnCopy} variant="caption">
            {copied ? 'copied' : 'copy'}
          </Link>
          <InputIcon color="primary" name="visibleActive" />
        </HStack>
      }
      helperText={helperText}
      label="API Access Token"
      onChange={handleOnChange}
      variant={variant}
    />
  );
}

export const AvatarInput = () => {
  const avatarImageUrl =
    'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

  return (
    <TextInput
      helperText="Please enter a valid email address"
      label="email"
      placeholder="brian@coinbase.com"
      start={
        <Box spacingHorizontal={2}>
          <Avatar alt="profile picture" size="m" src={avatarImageUrl} />
        </Box>
      }
    />
  );
};
