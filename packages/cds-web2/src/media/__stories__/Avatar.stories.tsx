import React, { useMemo } from 'react';
import { getAvatarFallbackColor } from '@cbhq/cds-common2/media/getAvatarFallbackColor';
import { AvatarSize } from '@cbhq/cds-common2/types/AvatarSize';

import { useTheme } from '../../hooks/useTheme';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { coinbaseDenseTheme } from '../../themes/coinbaseDenseTheme';
import { Text } from '../../typography/Text';
import { Avatar, type AvatarProps } from '../Avatar';

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
    <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
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
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" size={size} src={avatarImageUrl} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar
              key={i}
              alt=""
              borderColor="bgPositive"
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
              borderColor="bgPositive"
              shape="hexagon"
              size={size}
              src={avatarImageUrl}
            />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
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
    </div>
  );
};

const FallbackColoredBase = ({
  selected,
  shape,
  size,
  dense,
  dangerouslySetSize,
  style,
}: Pick<AvatarProps, 'selected' | 'shape' | 'size' | 'dangerouslySetSize' | 'style'> & {
  dense?: boolean;
}) => {
  return (
    <HStack alignItems="center" flexWrap="wrap" gap={dense ? 0.5 : 2}>
      {names.map((name, idx) => {
        const avatarFallbackColor = getAvatarFallbackColor(name);
        return (
          <Avatar
            key={name}
            alt=""
            colorScheme={idx === 0 ? 'blue' : avatarFallbackColor}
            dangerouslySetSize={dangerouslySetSize}
            name={name}
            selected={selected}
            shape={shape}
            size={size}
            style={style}
          />
        );
      })}
    </HStack>
  );
};

export const FallbackColored = () => {
  return (
    <div>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Sizes
        </Text>
        {sizes.map((size, i) => {
          return <FallbackColoredBase key={i} dense size={size} />;
        })}
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Selected
        </Text>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square
        </Text>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square Selected
        </Text>
        <FallbackColoredBase selected shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Hexagon
        </Text>
        <FallbackColoredBase shape="hexagon" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Hexagon Selected
        </Text>
        <FallbackColoredBase selected shape="hexagon" />
      </VStack>
    </div>
  );
};

export const FallbackColoredDense = () => {
  const theme = useTheme();
  const newTheme = useMemo(() => ({ ...theme, ...coinbaseDenseTheme }), [theme]);
  return (
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={newTheme}>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Sizes
        </Text>
        {sizes.map((size, i) => {
          return <FallbackColoredBase key={i} dense size={size} />;
        })}
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Selected
        </Text>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square
        </Text>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square Selected
        </Text>
        <FallbackColoredBase selected shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Hexagon
        </Text>
        <FallbackColoredBase shape="hexagon" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Hexagon Selected
        </Text>
        <FallbackColoredBase selected shape="hexagon" />
      </VStack>
    </ThemeProvider>
  );
};

export const FallbackImage = () => {
  return (
    <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
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
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" shape="square" size={size} />
          ))}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => (
            <Avatar key={i} alt="" borderColor="bgPositive" shape="hexagon" size={size} />
          ))}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
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
    </div>
  );
};
