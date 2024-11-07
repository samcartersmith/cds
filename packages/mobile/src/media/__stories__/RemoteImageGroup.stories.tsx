import React from 'react';
import { remoteImageGroupBuilder } from '@cbhq/cds-common/internal/remoteImageGroupBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography/TextBody';
import { TextLabel1 } from '../../typography/TextLabel1';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup } from '../RemoteImageGroup';

const { All } = remoteImageGroupBuilder({
  RemoteImageGroup,
  RemoteImage,
  VStack,
  TextLabel1,
  TextBody,
});

export { All };

const RemoteImageGroupScreen = () => {
  return (
    <ExampleScreen>
      <Example title="All">
        <All />
      </Example>
    </ExampleScreen>
  );
};

export default RemoteImageGroupScreen;
