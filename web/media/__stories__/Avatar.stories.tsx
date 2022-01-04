import { HStack, VStack } from '../../layout';
import { Avatar } from '../Avatar';
import { ThemeProvider } from '../../system';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

export default {
  component: Avatar,
  title: 'Core Components/Avatar',
};

// base64 encode the images to help make percy more reliable
export const Normal = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <HStack gap={2} alignItems="center">
          <Avatar alt="Sneezy" src={avatarImageUrl} />
          <Avatar alt="Happy" src={avatarImageUrl} shape="square" />
          <Avatar alt="Sleepy" src={avatarImageUrl} borderColor="positive" />
          <Avatar alt="Bashful" src={avatarImageUrl} size="m" />
          <Avatar alt="Grumpy" src={avatarImageUrl} size="l" />
          <Avatar alt="Grumpy" src={avatarImageUrl} size="xl" />
          <Avatar alt="Grumpy" src={avatarImageUrl} size="xxl" />
          <Avatar alt="Grumpy" src={avatarImageUrl} size="xxxl" />
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

export const Fallback = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <HStack gap={2} alignItems="center">
          <Avatar alt="Sneezy" />
          <Avatar alt="Happy" shape="square" />
          <Avatar alt="Sleepy" borderColor="positive" />
          <Avatar alt="Bashful" size="m" />
          <Avatar alt="Grumpy" size="l" />
          <Avatar alt="Grumpy" size="xl" />
          <Avatar alt="Grumpy" size="xxl" />
          <Avatar alt="Grumpy" size="xxxl" />
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};
