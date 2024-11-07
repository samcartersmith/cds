import { remoteImageGroupBuilder } from '@cbhq/cds-common/internal/remoteImageGroupBuilder';

import { VStack } from '../../layout';
import { TextBody, TextLabel1 } from '../../typography';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup } from '../RemoteImageGroup';

export default {
  component: RemoteImageGroup,
  title: 'Core Components/RemoteImage/RemoteImageGroup',
};

const { All } = remoteImageGroupBuilder({
  RemoteImageGroup,
  RemoteImage,
  VStack,
  TextLabel1: (props) => <TextLabel1 as="p" {...props} />,
  TextBody: (props) => <TextBody as="p" {...props} />,
});

export { All };
