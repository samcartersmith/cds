import React, { Image, StyleSheet } from 'react-native';
import { assets, ethBackground } from '@cbhq/cds-common2/internal/data/assets';

import { Button, IconButton, IconCounterButton } from '../../buttons';
import { TextInput } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Carousel, RemoteImage, RemoteImageGroup } from '../../media';
import { TextCaption, TextHeadline, TextLabel2, TextLegal, TextTitle3 } from '../../typography';
import {
  ContentCard,
  ContentCardBody,
  ContentCardBodyProps,
  ContentCardFooter,
  ContentCardFooterProps,
  ContentCardHeader,
  ContentCardHeaderProps,
} from '../ContentCard';
import { LikeButton } from '../LikeButton';

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 24,
  },
});

const exampleProps: {
  contentHeaderProps: ContentCardHeaderProps;
  contentBodyProps: ContentCardBodyProps;
  contentFooterProps: ContentCardFooterProps;
} = {
  contentHeaderProps: {
    avatar: assets.eth.imageUrl,
    title: 'CoinDesk',
    meta: 'News',
    end: (
      <HStack gap={0}>
        <IconButton
          transparent
          accessibilityLabel="favorite coinDesk card news"
          name="starInactive"
          variant="secondary"
        />
        <IconButton
          transparent
          accessibilityLabel="More information about coinDesk card news"
          name="more"
          variant="secondary"
        />
      </HStack>
    ),
  },
  contentBodyProps: {
    body: 'Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s',
    label: (
      <HStack alignItems="flex-end" flexWrap="wrap" gap={0.5}>
        <TextLabel2 color="fgMuted" numberOfLines={1}>
          $9,9081.01
        </TextLabel2>
        <TextLabel2 color="fgPositive">↗ 6.37%</TextLabel2>
      </HStack>
    ),
    media: (
      <Image
        accessibilityIgnoresInvertColors
        source={{
          uri: ethBackground,
        }}
        style={styles.media}
      />
    ),
    mediaPosition: 'top',
  },
  contentFooterProps: {
    children: (
      <>
        <RemoteImageGroup shape="circle" size={32}>
          <RemoteImage source={assets.eth.imageUrl} />
          <RemoteImage source={assets.polygon.imageUrl} />
          <RemoteImage source={assets.uni.imageUrl} />
          <RemoteImage source={assets.sushi.imageUrl} />
        </RemoteImageGroup>
        <Button compact variant="secondary">
          Share
        </Button>
      </>
    ),
  },
};

const CarouselItem = () => (
  <VStack position="relative">
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={{
        height: 381,
        width: 259,
        objectFit: 'cover',
        borderRadius: 24,
      }}
    />
    <VStack bottom={16} gap={1} left={16} position="absolute">
      <TextHeadline color="bgSecondary">Break the cycle</TextHeadline>
      <TextLegal color="bgSecondary">24M views</TextLegal>
    </VStack>
  </VStack>
);

const ContentCardScreen = () => {
  return (
    <ExampleScreen>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with mediaPosition bottom</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="bottom" />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with mediaPosition right</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={{ ...styles.media, height: 96 }}
              />
            }
            mediaPosition="right"
          />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with mediaPosition left</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            media={
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={{ ...styles.media, height: 96 }}
              />
            }
            mediaPosition="left"
          />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with no media</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter {...exampleProps.contentFooterProps} />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with product component</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
            <TextInput
              accessibilityLabel="Text input field"
              label="TextArea with character counter"
            />
          </ContentCardBody>
          <ContentCardFooter>
            <HStack gap={1}>
              <LikeButton
                liked
                accessibilityLabel="9999 likes, like coinDesk card news"
                count={9999}
              />
              <IconButton transparent accessibilityLabel="share coinDesk news" name="share" />
            </HStack>
            <Button compact variant="secondary">
              Share
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with product component - Custom Media</TextTitle3>
        <ContentCard>
          <ContentCardHeader
            {...exampleProps.contentHeaderProps}
            avatar={null}
            end={<TextLegal color="fgMuted">Updated 1hr ago</TextLegal>}
            meta={null}
            title={<TextTitle3>Today&apos;s briefing</TextTitle3>}
          />
          <ContentCardBody
            {...exampleProps.contentBodyProps}
            label={null}
            media={
              <HStack position="relative">
                <Image
                  accessibilityIgnoresInvertColors
                  source={{
                    uri: ethBackground,
                  }}
                  style={{ ...styles.media, position: 'relative' }}
                />
                <HStack
                  bordered
                  alignItems="center"
                  background="bg"
                  borderRadius={300}
                  gap={0.5}
                  justifyContent="center"
                  left={16}
                  padding={1}
                  position="absolute"
                  top={16}
                >
                  <TextCaption>ETH</TextCaption>
                  <TextLabel2 color="fgPositive">↗ 6.37%</TextLabel2>
                </HStack>
              </HStack>
            }
          />
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with product component - Carousel</TextTitle3>
        <ContentCard>
          <ContentCardHeader
            {...exampleProps.contentHeaderProps}
            avatar={null}
            end={null}
            meta={null}
            title={<TextTitle3>Crypto moves money forward</TextTitle3>}
          />
          <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
            <Carousel
              gap={1.5}
              items={[
                <CarouselItem key="carouselItem1" />,
                <CarouselItem key="carouselItem2" />,
                <CarouselItem key="carouselItem3" />,
              ]}
            />
          </ContentCardBody>
        </ContentCard>
      </Example>
      <Example paddingX={0}>
        <TextTitle3 paddingX={3}>Full Example with IconCounterButton</TextTitle3>
        <ContentCard>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter>
            <HStack gap={4} justifyContent="space-between" paddingTop={0.5}>
              <IconCounterButton count={99} icon="heartInactive" />
              <IconCounterButton count={4200} icon="comment" />
              <IconCounterButton count={9900000} icon="arrowsHorizontal" />
            </HStack>
          </ContentCardFooter>
        </ContentCard>
      </Example>
    </ExampleScreen>
  );
};

export default ContentCardScreen;
