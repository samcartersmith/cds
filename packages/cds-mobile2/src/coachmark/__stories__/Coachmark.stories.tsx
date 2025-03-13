import React from 'react';
import { Image } from 'react-native';
import { useToggler } from '@cbhq/cds-common2';
import { ethBackground } from '@cbhq/cds-common2/internal/data/assets';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations';
import { Coachmark } from '../Coachmark';

const CoachmarkExamples = () => {
  const [checked, { toggle }] = useToggler();

  return (
    <VStack gap={3}>
      <Coachmark
        action={<Button>Next</Button>}
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="Basic"
      />
      <Coachmark
        action={<Button>Next</Button>}
        checkbox={
          <Checkbox checked={checked} onChange={toggle}>
            Don&apos;t show again
          </Checkbox>
        }
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="With checkbox"
      />
      <Coachmark
        action={<Button>Next</Button>}
        closeButtonAccessibilityLabel="Close"
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        onClose={noop}
        title="Dismissible"
      />
      <Coachmark
        action={<Button>Next</Button>}
        closeButtonAccessibilityLabel="Close"
        content={
          <VStack gap={2}>
            <Text font="caption" color="fgMuted">
              50%
            </Text>
            <ProgressBar progress={0.5} />
            <Text>
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </Text>
          </VStack>
        }
        media={
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={{ width: '100%', height: 150 }}
          />
        }
        onClose={noop}
        title="Rich Content"
      />
      <Coachmark
        action={<Button>Done</Button>}
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="Custom width"
        width={250}
      />
    </VStack>
  );
};

const CoachmarkScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Coachmark">
        <CoachmarkExamples />
      </Example>
    </ExampleScreen>
  );
};

export default CoachmarkScreen;
