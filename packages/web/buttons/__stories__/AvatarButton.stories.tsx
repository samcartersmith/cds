import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { AvatarButton } from '../AvatarButton';

 

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

function handlePress(e: React.MouseEvent) {
  console.log(`pressed ${e.target}`);
}

export default {
  component: AvatarButton,
  title: 'Core Components/Buttons/AvatarButton',
};

export const Default = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <HStack gap={2} alignItems="center">
          <AvatarButton alt="Sneezy" src={avatarImageUrl} onPress={handlePress} />
          <AvatarButton compact alt="Sneezy" src={avatarImageUrl} to="/" />
        </HStack>
        <HStack gap={2} alignItems="center">
          <AvatarButton alt="Sneezy" onPress={handlePress} />
          <AvatarButton compact alt="Sneezy" to="/" />
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

export const Loading = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
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
    </ThemeProvider>
  );
};
