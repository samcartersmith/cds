import { ThemeProviderBaseProps } from '@cbhq/cds-common';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';

import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextHeadline } from '../../typography/TextHeadline';
import { AvatarButton, AvatarButtonProps } from '../AvatarButton';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

const FallbackColoredBase = ({
  dense = true,
  ...props
}: Pick<AvatarButtonProps, 'shape' | 'loading' | 'compact' | 'selected'> & { dense?: boolean }) => {
  return (
    <HStack gap={dense ? 0.5 : 2} alignItems="center" flexWrap="wrap">
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <AvatarButton
            alt=""
            key={name}
            name={name}
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            {...props}
          />
        );
      })}
    </HStack>
  );
};

function handlePress(e: React.MouseEvent) {
  console.log(`pressed ${e.target}`);
}

export default {
  component: AvatarButton,
  title: 'Core Components/Buttons/AvatarButton',
};

export const Default = ({ scale }: Pick<ThemeProviderBaseProps, 'scale'>) => {
  return (
    <ThemeProvider scale={scale}>
      <VStack gap={2}>
        <TextHeadline as="h3">Default</TextHeadline>
        <HStack gap={2} alignItems="center">
          <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} />
          <AvatarButton compact alt="Sneezy" src={avatarImageUrl} to="/" />
        </HStack>
        <HStack gap={2} alignItems="center">
          <AvatarButton alt="Sneezy" onPress={handlePress} />
          <AvatarButton compact alt="Sneezy" to="/" />
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Loading</TextHeadline>
        <HStack gap={2} alignItems="center">
          <AvatarButton
            alt="Sneezy"
            src={avatarImageUrl}
            onPress={handlePress}
            loading
            accessibilityLabel="Sneezy Button"
          />
          <AvatarButton
            compact
            alt="Sneezy"
            src={avatarImageUrl}
            to="/"
            loading
            accessibilityLabel="Sneezy Button"
          />
        </HStack>
        <HStack gap={2} alignItems="center">
          <AvatarButton
            alt="Sneezy"
            onPress={handlePress}
            loading
            accessibilityLabel="Sneezy Button"
          />
          <AvatarButton compact alt="Sneezy" to="/" loading accessibilityLabel="Sneezy Button" />
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback</TextHeadline>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback Loading</TextHeadline>
        <FallbackColoredBase loading />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback Compact</TextHeadline>
        <FallbackColoredBase compact />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback Compact Loading</TextHeadline>
        <FallbackColoredBase compact loading />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback Selected</TextHeadline>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Colored Fallback Square</TextHeadline>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Square Selected</TextHeadline>
        <FallbackColoredBase shape="square" selected />
      </VStack>
    </ThemeProvider>
  );
};

export const Dense = () => <Default scale="small" />;
