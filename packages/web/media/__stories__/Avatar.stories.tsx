import { ThemeProviderBaseProps } from '@cbhq/cds-common';
import { useAvatarFallbackColors } from '@cbhq/cds-common/media/useAvatarFallbackColors';
import { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';

import { HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextHeadline } from '../../typography';
import { Avatar, AvatarWebProps } from '../Avatar';

const avatarImageUrl =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

export default {
  component: Avatar,
  title: 'Core Components/Avatar',
};

const sizes: AvatarSize[] = ['m', 'l', 'xl', 'xxl', 'xxxl'];
const names = ['Sneezy', 'Happy', 'Sleepy', 'Doc', 'Bashful', 'Grumpy', 'Dopey', 'Lilo', 'Stitch'];

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
          <Avatar selected alt="Grumpy" src={avatarImageUrl} size="xxxl" />
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};

const FallbackColoredBase = ({
  selected,
  shape,
  size,
  dense,
}: Pick<AvatarWebProps, 'selected' | 'shape' | 'size'> & { dense?: boolean }) => {
  const avatarFallbackColors = useAvatarFallbackColors(names.length);
  return (
    <HStack gap={dense ? 0.5 : 2} alignItems="center" flexWrap="wrap">
      {names.map((name, idx) => (
        <Avatar
          alt=""
          name={name}
          colorScheme={avatarFallbackColors[idx]}
          selected={selected}
          shape={shape}
          size={size}
        />
      ))}
    </HStack>
  );
};

export const FallbackColored = ({ scale }: Pick<ThemeProviderBaseProps, 'scale'>) => {
  return (
    <ThemeProvider scale={scale}>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Default</TextHeadline>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Sizes</TextHeadline>
        {sizes.map((size) => {
          return <FallbackColoredBase size={size} dense />;
        })}
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Selected</TextHeadline>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Square</TextHeadline>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Square Selected</TextHeadline>
        <FallbackColoredBase shape="square" selected />
      </VStack>
    </ThemeProvider>
  );
};

export const FallbackColoredDense = () => <FallbackColored scale="small" />;

export const FallbackImage = () => {
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
          <Avatar alt="Grumpy" size="xxxl" selected />
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};
