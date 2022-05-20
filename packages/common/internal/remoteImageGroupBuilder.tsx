import React, { ComponentType } from 'react';

import { BoxBaseProps, RemoteImageBaseProps, StackBaseProps, TextBaseProps } from '../types';
import { RemoteImageGroupBaseProps } from '../types/RemoteImageGroupBaseProps';

import { assets, squareAssets } from './data/assets';
import { avatarSizes } from './data/avatars';

type RemoteImageBuilder = {
  RemoteImageGroup: ComponentType<RemoteImageGroupBaseProps>;
  RemoteImage: ComponentType<
    RemoteImageBaseProps & {
      source: string;
    }
  >;
  VStack: ComponentType<BoxBaseProps & StackBaseProps>;
  TextLabel1: ComponentType<TextBaseProps>;
  TextBody: ComponentType<TextBaseProps>;
};

export const remoteImageBuilder = ({
  RemoteImageGroup,
  RemoteImage,
  VStack,
  TextLabel1,
  TextBody,
}: RemoteImageBuilder) => {
  const Circle = () => (
    <>
      <TextLabel1>Circle Custom Size: 32x32. Test that default max = 4.</TextLabel1>
      <RemoteImageGroup shape="circle" size={32}>
        <RemoteImage source={assets.eth.imageUrl} />
        <RemoteImage source={assets.btc.imageUrl} />
        <RemoteImage source={assets.dai.imageUrl} />
        <RemoteImage source={assets.hbar.imageUrl} />
        <RemoteImage source={assets.ltc.imageUrl} />
        <RemoteImage source={assets.uni.imageUrl} />
      </RemoteImageGroup>
    </>
  );

  const CircleCustomSize = () => (
    <>
      <TextLabel1>Circle Custom Size: 60x60</TextLabel1>
      <RemoteImageGroup shape="circle" size={60}>
        <RemoteImage source={assets.eth.imageUrl} />
        <RemoteImage source={assets.btc.imageUrl} />
        <RemoteImage source={assets.dai.imageUrl} />
      </RemoteImageGroup>
    </>
  );

  const CircleAvatarSize = () => (
    <>
      {avatarSizes.map((size) => (
        <>
          <TextLabel1>Circle Avatar Size: {size}</TextLabel1>
          <RemoteImageGroup shape="circle" size={size}>
            <RemoteImage source={assets.eth.imageUrl} />
            <RemoteImage source={assets.btc.imageUrl} />
            <RemoteImage source={assets.dai.imageUrl} />
          </RemoteImageGroup>
        </>
      ))}
    </>
  );

  const CircleMax = () => {
    const maxSizes = [1, 2, 3, 4];

    return (
      <>
        {avatarSizes.map((avatarSize) => (
          <>
            {maxSizes.map((maxSize) => (
              <>
                <TextLabel1>
                  Max Size to Truncate: {maxSize}, RemoteImage size: {avatarSize}
                </TextLabel1>
                <RemoteImageGroup max={maxSize} size={avatarSize} shape="circle">
                  <RemoteImage source={assets.eth.imageUrl} />
                  <RemoteImage source={assets.dai.imageUrl} />
                  <RemoteImage source={assets.btc.imageUrl} />
                  <RemoteImage source={assets.sushi.imageUrl} />
                  <RemoteImage source={assets.eth.imageUrl} />
                  <RemoteImage source={assets.dai.imageUrl} />
                  <RemoteImage source={assets.btc.imageUrl} />
                  <RemoteImage source={assets.sushi.imageUrl} />
                  <RemoteImage source={assets.eth.imageUrl} />
                  <RemoteImage source={assets.dai.imageUrl} />
                  <RemoteImage source={assets.btc.imageUrl} />
                </RemoteImageGroup>
              </>
            ))}
          </>
        ))}
      </>
    );
  };

  // Defaults to avatarSize medium when you don't specify the size of
  // RemoteImageGroup
  const CircleMaxDefaultCustomSize = () => (
    <>
      <TextBody>
        RemoteImageGroup excess element defaults to m of AvatarSize when size is not specified
      </TextBody>
      <RemoteImageGroup max={2} shape="circle">
        <RemoteImage source={assets.eth.imageUrl} />
        <RemoteImage source={assets.sushi.imageUrl} />
        <RemoteImage source={assets.xrp.imageUrl} />
        <RemoteImage source={assets.ltc.imageUrl} />
      </RemoteImageGroup>
    </>
  );
  const Squircle = () => (
    <>
      <TextLabel1>Sqcircle Custom Size: 32x32</TextLabel1>
      <RemoteImageGroup shape="squircle" size={32}>
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
        <RemoteImage source={squareAssets.human1} />
      </RemoteImageGroup>
    </>
  );

  const SquircleCustomSize = () => (
    <>
      <TextLabel1>Sqcircle Custom Size: 80x80</TextLabel1>
      <RemoteImageGroup size={80} shape="squircle">
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
        <RemoteImage source={squareAssets.human1} />
      </RemoteImageGroup>
    </>
  );

  const SquircleAvatarSize = () => (
    <>
      {avatarSizes.map((size) => (
        <>
          <TextLabel1>Sqcircle Avatar Size: {size}</TextLabel1>
          <RemoteImageGroup size={size} shape="squircle">
            <RemoteImage source={squareAssets.human1} />
            <RemoteImage source={squareAssets.human2} />
            <RemoteImage source={squareAssets.human1} />
          </RemoteImageGroup>
        </>
      ))}
    </>
  );

  const SquircleMax = () => {
    const maxSizes = [1, 2, 3, 4];

    return (
      <>
        {avatarSizes.map((avatarSize) => (
          <>
            {maxSizes.map((maxSize) => (
              <>
                <TextLabel1>
                  Max Size to Truncate: {maxSize}, RemoteImage size: {avatarSize}
                </TextLabel1>
                <RemoteImageGroup max={maxSize} size={avatarSize} shape="squircle">
                  <RemoteImage source={squareAssets.human2} />
                  <RemoteImage source={squareAssets.human1} />
                  <RemoteImage source={squareAssets.human2} />
                  <RemoteImage source={squareAssets.human1} />
                </RemoteImageGroup>
              </>
            ))}
          </>
        ))}
      </>
    );
  };

  // Defaults to avatarSize medium when you don't specify the size of
  // RemoteImageGroup
  const SquircleMaxDefaultCustomSize = () => (
    <>
      <TextBody>
        RemoteImageGroup excess element defaults to m of AvatarSize when size is not specified
      </TextBody>
      <RemoteImageGroup max={2} shape="squircle">
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
      </RemoteImageGroup>
    </>
  );

  const SquircleMaxSetCustomMaxSize = () => (
    <>
      <TextBody>Set a custom size of 36 for RemoteImageGroup excess component</TextBody>
      <RemoteImageGroup max={2} size={36} shape="squircle">
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
      </RemoteImageGroup>
    </>
  );

  const HideExcessWhenExceedThreshold = () => (
    <>
      <TextBody>Excess component when size is smaller than a certain size looks funky</TextBody>
      <RemoteImageGroup max={2} size={19} shape="squircle">
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
        <RemoteImage source={squareAssets.human1} />
        <RemoteImage source={squareAssets.human2} />
      </RemoteImageGroup>
    </>
  );

  const All = () => (
    <VStack gap={7}>
      <Circle />
      <CircleCustomSize />
      <CircleAvatarSize />
      <CircleMax />
      <CircleMaxDefaultCustomSize />
      <Squircle />
      <SquircleCustomSize />
      <SquircleAvatarSize />
      <SquircleMax />
      <SquircleMaxDefaultCustomSize />
      <SquircleMaxSetCustomMaxSize />
      <HideExcessWhenExceedThreshold />
    </VStack>
  );

  return {
    All,
  };
};
