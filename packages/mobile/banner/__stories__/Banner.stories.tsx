import React from 'react';
import { bannerBuilder } from '@cbhq/cds-common/internal/bannerBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spacer, VStack } from '../../layout';
import { Link, TextTitle1 } from '../../typography';
import { Banner } from '../Banner';

const { All } = bannerBuilder(Banner, Link, TextTitle1, VStack, Spacer);

const BannerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Banners">
        <All />
      </Example>
    </ExampleScreen>
  );
};

export default BannerScreen;
