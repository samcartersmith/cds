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
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} shape="square" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} shape="hexagon" />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With borderColor prop</TextHeadline>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} borderColor="positive" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar
              alt=""
              key={i}
              src={avatarImageUrl}
              size={size}
              borderColor="positive"
              shape="square"
            />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar
              alt=""
              key={i}
              src={avatarImageUrl}
              size={size}
              borderColor="positive"
              shape="hexagon"
            />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With Selected prop</TextHeadline>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} selected />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} selected shape="square" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} src={avatarImageUrl} size={size} selected shape="hexagon" />
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
    <HStack gap={dense ? 0.5 : 2} alignItems="center" flexWrap="wrap">
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            key={name}
            alt=""
            name={name}
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
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
          return <FallbackColoredBase key={i} size={size} dense />;
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
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Hexagon</TextHeadline>
        <FallbackColoredBase shape="hexagon" />
      </VStack>
      <VStack gap={2} spacingTop={4}>
        <TextHeadline as="h3">Hexagon Selected</TextHeadline>
        <FallbackColoredBase shape="hexagon" selected />
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
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} shape="square" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} shape="hexagon" />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With borderColor prop</TextHeadline>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} borderColor="positive" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} borderColor="positive" shape="square" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} borderColor="positive" shape="hexagon" />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} spacingTop={2}>
        <TextHeadline as="h3">With Selected prop</TextHeadline>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} selected />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} selected shape="square" />
          ))}
        </HStack>
        <HStack gap={2} alignItems="center">
          {sizes.map((size, i) => (
            <Avatar alt="" key={i} size={size} selected shape="hexagon" />
          ))}
        </HStack>
      </VStack>
    </ThemeProvider>
  );
};
