import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';

import { VStack } from '../../alpha/VStack';
import { Spacer } from '../../layout/Spacer';
import { Link } from '../../typography';
import { TextTitle1 } from '../../typography/TextTitle1';
import { Banner } from '../Banner';

export default {
  component: Banner,
  title: 'Core Components/Banner',
};

export const { All } = bannerBuilder(
  Banner,
  Link,
  (props) => <TextTitle1 as="h1" {...props} />,
  VStack,
  Spacer,
);
