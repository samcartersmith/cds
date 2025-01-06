import React from 'react';
import { View } from 'react-native';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { IconButton } from '../../buttons';
import { ExampleScreen } from '../../examples/ExampleScreen';
import { LogoMark } from '../../icons';
import { SpotSquare } from '../../illustrations';
import { Box, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { TextBody, TextTitle1, TextTitle3 } from '../../typography';
import { PageHeader } from '../PageHeader';

const exampleProps = {
  logoMark1: <RemoteImage shape="circle" size="m" source={assets.btc.imageUrl} />,
  logoMark2: <LogoMark size={32} />,
  start1: <IconButton name="backArrow" onPress={NoopFn} testID="header-back-button" />,
  title1: <TextTitle3>Page Title</TextTitle3>,
};

const PageHeaderInErrorEmptyState = () => {
  return (
    <View>
      <ExampleScreen>
        <VStack gap={0} width="100%">
          <PageHeader
            background="background"
            position="sticky"
            start={exampleProps.logoMark2}
            top="0"
          />
          <Box background="backgroundPrimaryWash">
            <VStack
              alignContent="center"
              alignItems="center"
              flexGrow={1}
              flexShrink={1}
              gap={2}
              justifyContent="center"
              paddingX={4}
              paddingY={10}
            >
              <SpotSquare name="frameEmpty" />
              <TextTitle1>You need to X before you Y</TextTitle1>
              <TextBody align="center">
                You&apos;ll need to [add funds] before you can [complete this transaction]
              </TextBody>
            </VStack>
          </Box>
        </VStack>
      </ExampleScreen>
    </View>
  );
};

export default PageHeaderInErrorEmptyState;
