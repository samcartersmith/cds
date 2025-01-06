import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoopFn } from '@cbhq/cds-common2/utils/mockUtils';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { TextTitle1, TextTitle3 } from '../../typography';
import { PageFooter } from '../PageFooter';
import { PageHeader } from '../PageHeader';

const exampleProps = {
  start: <IconButton name="backArrow" onPress={NoopFn} testID="header-back-button" />,
  title: <TextTitle3>Page Title</TextTitle3>,
  endButtons: (
    <ButtonGroup block accessibilityLabel="Group">
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Next</Button>
    </ButtonGroup>
  ),
};
const PageHeaderInPage = () => {
  const inset = useSafeAreaInsets();

  return (
    <View>
      <ExampleScreen>
        <VStack gap={0} width="100%">
          <PageHeader
            background="background"
            end={<IconButton name="close" testID="header-back-button" />}
            position="sticky"
            start={exampleProps.start}
            title={exampleProps.title}
            top="0"
          />
          <VStack
            alignContent="center"
            alignItems="center"
            dangerouslySetBackground="#FADADD"
            flexGrow={1}
            flexShrink={1}
            height="500px"
            justifyContent="center"
            padding={10}
          >
            <TextTitle1>Primary Content</TextTitle1>
          </VStack>
        </VStack>
      </ExampleScreen>
      <View style={{ position: 'absolute', bottom: inset.bottom / 2, left: 0, right: 0 }}>
        <PageFooter action={exampleProps.endButtons} />
      </View>
    </View>
  );
};

export default PageHeaderInPage;
