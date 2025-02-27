import React from 'react';
import { remoteImageGroupBuilder } from '@cbhq/cds-common2/internal/remoteImageGroupBuilder';

import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
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
  TextLabel1: (props) => <Text as="p" font="label1" {...props} />,
  TextBody: (props) => <Text as="p" font="body" {...props} />,
});

export { All };
