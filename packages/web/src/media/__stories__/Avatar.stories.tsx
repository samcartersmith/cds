/* eslint-disable react/no-array-index-key */
import { ThemeProviderBaseProps } from '@cbhq/cds-common';
import { getAvatarFallbackColor } from '@cbhq/cds-common/media/getAvatarFallbackColor';
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
        <TextHeadline as="h3">Default</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="square" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="hexagon" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With borderColor prop</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="positive" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar
              key={i}
              alt=""
              borderColor="positive"
              shape="square"
              size={size}
              src={avatarImageUrl}
            />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar
              key={i}
              alt=""
              borderColor="positive"
              shape="hexagon"
              size={size}
              src={avatarImageUrl}
            />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With Selected prop</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="square" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="hexagon" size={size} src={avatarImageUrl} />
          ))}
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
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={dense ? 0.5 : 2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            key={name}
            alt=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            name={name}
            selected={selected}
            shape={shape}
            size={size}
          />
        );
      })}
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
        {sizes.map((size, i) => {
          return <FallbackColoredBase key={i} dense size={size} />;
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
        <FallbackColoredBase selected shape="square" />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Hexagon</TextHeadline>
        <FallbackColoredBase shape="hexagon" />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Hexagon Selected</TextHeadline>
        <FallbackColoredBase selected shape="hexagon" />
      </VStack>
    </ThemeProvider>
  );
};

export const FallbackColoredDense = () => <FallbackColored scale="small" />;

export const FallbackImage = () => {
  return (
    <ThemeProvider>
      <VStack gap={2}>
        <TextHeadline as="h3">Default</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With borderColor prop</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="positive" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="positive" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="positive" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With Selected prop</TextHeadline>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} selected alt="" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};
