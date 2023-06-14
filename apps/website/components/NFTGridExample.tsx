import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { RemoteImage } from '@cbhq/cds-web/media';
import { TextBody, TextCaption, TextHeadline } from '@cbhq/cds-web/typography';

export const nftData = [
  {
    name: 'Crypto Coven',
    available: 31,
    comments: 42,
    likes: 98,
    price: 2.3,
    target: 'https://coinbase.com',
    src: '',
  },
  {
    name: 'Bitcoin Baddies',
    available: 88,
    comments: 16,
    likes: 9234,
    price: 9,
    target: 'https://coinbase.com',
    src: '',
  },
  {
    name: 'Loyal Lemurs',
    available: 9999,
    comments: 0,
    likes: 4,
    price: 0.02,
    target: 'https://coinbase.com',
    src: '',
  },
  {
    name: 'Otherworld',
    available: 1000,
    comments: 928,
    likes: 993,
    price: 64,
    target: 'https://coinbase.com',
    src: '',
  },
  {
    name: 'Dorito Dust',
    available: 42,
    comments: 844,
    likes: 93,
    price: 99,
    target: 'https://coinbase.com',
    src: '',
  },
];

type NFTTileProps = {
  name: string;
  available: number;
  src: string;
  comments?: number;
  likes?: number;
  price: number;
  target: string;
};

export const NFTTile = ({ name, available, src, comments, likes, price, target }: NFTTileProps) => {
  return (
    <VStack>
      <VStack
        borderRadius="roundedLarge"
        overflow="clip"
        minHeight={430}
        background="backgroundAlternate"
      >
        <a href={target}>
          <VStack position="relative">
            <RemoteImage src={src} alt={name} height="264" />
            <HStack
              background="backgroundAlternate"
              borderRadius="rounded"
              position="absolute"
              bottom={20}
              left={20}
              spacing={0.5}
            >
              <TextCaption as="p" color="foreground">
                {available} available
              </TextCaption>
            </HStack>
          </VStack>
        </a>
        <VStack justifyContent="space-between" spacing={2} flexGrow={1}>
          <VStack spacingBottom={2}>
            <TextCaption as="p" color="foregroundMuted">
              {name}
            </TextCaption>
            <TextHeadline as="h4">{name}</TextHeadline>
          </VStack>
          <HStack gap={2}>
            <HStack gap={1} alignItems="center">
              <Icon name="heartInactive" size="s" />
              <TextBody as="span">{likes}</TextBody>
            </HStack>
            <HStack gap={1} alignItems="center">
              <Icon name="comment" size="s" />
              <TextBody as="span">{comments}</TextBody>
            </HStack>
            <HStack gap={1} alignItems="center">
              <Icon name="ethereum" size="s" />
              <TextBody as="span">{price}</TextBody>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export const nftTagNames = [
  'Disco Kittens',
  'Flamboyant Fungi',
  'Bored Banjos',
  'Dorito Dust',
  'WAGMI',
  'Lazr Katz',
  'Crypto Coven',
  'Bitcoin Baddies',
  'Loyal Lemurs',
  'Otherworld',
];
