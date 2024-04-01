import { ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button, IconButton, IconCounterButton } from '../../../buttons';
import { NativeTextArea, TextInput } from '../../../controls';
import { Divider, HStack, VStack } from '../../../layout';
import { RemoteImage, RemoteImageGroup } from '../../../media';
import { TextCaption, TextHeadline, TextLabel2, TextLegal, TextTitle3 } from '../../../typography';
import { LikeButton } from '../../LikeButton';
import {
  ContentCard,
  ContentCardBody,
  ContentCardBodyProps,
  ContentCardFooter,
  ContentCardFooterProps,
  ContentCardHeader,
  ContentCardHeaderProps,
} from '..';

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
        <TextLabel2 as="p" color="foregroundMuted" numberOfLines={1}>
          $9,9081.01
        </TextLabel2>
        <TextLabel2 as="p" color="positive">
          ↗ 6.37%
        </TextLabel2>
      </HStack>
    ),
    media: (
      <img
        alt=""
        aria-hidden="true"
        src={ethBackground}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
        width="100%"
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

export const Default = (): JSX.Element => {
  return (
    <VStack gap={1} left={0} position="absolute" spacing={1} spacingTop={3} top={0}>
      <TextHeadline as="h3" spacingStart={3}>
        Full Example
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider spacingBottom={2} />
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with mediaPosition bottom
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="bottom" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider spacingBottom={2} spacingStart={3} />
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with mediaPosition right
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPosition="right" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider spacingBottom={2} spacingStart={3} />
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with no media
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Divider spacingBottom={2} spacingStart={3} />
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with product component - TextInput
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
          <TextInput
            inputNode={
              <NativeTextArea
                cols={5}
                onChange={NoopFn}
                placeholder="Type something here..."
                rows={7}
                value="Custom content"
              />
            }
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
      <Divider spacingBottom={2} spacingStart={3} />
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with product component - Custom Media
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          avatar={null}
          end={
            <TextLegal as="span" color="foregroundMuted">
              Updated 1hr ago
            </TextLegal>
          }
          meta={null}
          title={<TextTitle3 as="h2">Today&apos;s briefing</TextTitle3>}
        />
        <ContentCardBody
          {...exampleProps.contentBodyProps}
          label={null}
          media={
            <HStack position="relative">
              <HStack
                background
                bordered
                alignItems="center"
                borderRadius="roundedMedium"
                gap={0.5}
                justifyContent="center"
                left={16}
                position="absolute"
                spacing={1}
                top={16}
              >
                <TextCaption as="p">ETH</TextCaption>
                <TextLabel2 as="p" color="positive">
                  ↗ 6.37%
                </TextLabel2>
              </HStack>
              <img
                alt=""
                aria-hidden="true"
                src={ethBackground}
                style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
                width="100%"
              />
            </HStack>
          }
        />
      </ContentCard>
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with IconCounterButtons
      </TextHeadline>
      <ContentCard>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null} />
        <ContentCardFooter>
          <HStack gap={4} justifyContent="space-between" spacingTop={0.5}>
            <IconCounterButton count={99} icon="heartInactive" />
            <IconCounterButton count={4200} icon="comment" />
            <IconCounterButton count={9900000} icon="arrowsHorizontal" />
          </HStack>
        </ContentCardFooter>
      </ContentCard>
    </VStack>
  );
};

export const ProductCarousel = () => {
  return (
    <VStack>
      <TextHeadline as="h3" spacingStart={3}>
        Full Example with product component - Carousel
      </TextHeadline>
      <ContentCard maxWidth="100%">
        <ContentCardHeader
          {...exampleProps.contentHeaderProps}
          avatar={null}
          end={null}
          meta={null}
          title={<TextTitle3 as="h3">Crypto moves money forward</TextTitle3>}
        />
        <ContentCardBody {...exampleProps.contentBodyProps} label={null} media={null}>
          <HStack gap={2} overflow="auto">
            {[1, 2, 3, 4, 5].map((id) => (
              <VStack key={id} position="relative">
                <img
                  alt=""
                  aria-hidden="true"
                  height={381}
                  src={ethBackground}
                  style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '24px' }}
                  width={259}
                />
                <VStack bottom={16} gap={1} left={16} position="absolute">
                  <TextHeadline as="h3" color="secondary">
                    Break the cycle
                  </TextHeadline>
                  <TextLegal as="p" color="secondary">
                    24M views
                  </TextLegal>
                </VStack>
              </VStack>
            ))}
          </HStack>
        </ContentCardBody>
      </ContentCard>
    </VStack>
  );
};

export default {
  title: 'Core Components/Cards/ContentCard',
  component: ContentCard,
};

ProductCarousel.parameters = {
  a11y: { config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] } },
};
