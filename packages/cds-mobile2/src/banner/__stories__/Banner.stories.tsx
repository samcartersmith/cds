import React, { useMemo } from 'react';
import { bannerBuilder } from '@cbhq/cds-common2/internal/bannerBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spacer, VStack } from '../../layout';
import { Link, TextTitle1 } from '../../typography';
import { TextBody } from '../../typography/TextBody';
import { Banner } from '../Banner';

const { All } = bannerBuilder(Banner, Link, TextTitle1, VStack, Spacer);

const BannerScreen = () => {
  const customStyle = useMemo(
    () => ({
      paddingTop: 32,
      paddingBottom: 32,
      backgroundColor: 'orange',
      borderColor: 'orange',
    }),
    [],
  );
  return (
    <ExampleScreen>
      <Example title="Banners">
        <All />
        <VStack gap={2}>
          <Spacer />
          <TextTitle1>BannerWithCustomStyle</TextTitle1>
          <Banner
            showDismiss
            startIcon="pencil"
            style={customStyle}
            title="Banner with custom Style"
            variant="informational"
          >
            <TextBody>Lorem ipsum dolar sit amet, consecturo</TextBody>
          </Banner>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default BannerScreen;
