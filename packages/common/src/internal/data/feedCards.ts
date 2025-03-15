import { likeCounter } from '../utils/likeCounter';

import { avatars } from './avatars';
import { feedImages } from './feedImages';
import { loremIpsum } from './loremIpsum';

const onPress = () => {
  console.log('pressed');
};

const defaultProps = {
  avatar: avatars[0],
  author: 'Author Name',
  metadata: 'News • Dec 18',
  title: 'Title',
  description: loremIpsum,
  image: feedImages[0],
  headerAction: {
    name: 'more',
    onPress,
  },
  like: likeCounter({
    liked: false,
    count: 10,
  }),
  share: { onPress },
  cta: {
    onPress,
    children: 'View ETH',
  },
} as const;

export const feedCards = [
  {
    ...defaultProps,
    key: 'card1',
    title: 'Russia Values Local Crypto at $200 Billion as Rules Near',
  },
  {
    ...defaultProps,
    key: 'card2',
    avatar: avatars[1],
    image: feedImages[1],
    title: 'Reddit co-founder raises $500 million fund for crypto startups: report',
    description:
      '776 Management, the VC firm owned by Reddit co-founder Alexis Ohanian, has raised $500 million for two new funds primarily focused on...',
    like: likeCounter({
      liked: true,
      count: 3,
    }),
    comment: {
      onPress,
    },
  },
] as const;
