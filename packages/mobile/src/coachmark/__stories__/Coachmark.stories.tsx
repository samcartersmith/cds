import React from 'react';
import { Image } from 'react-native';
import { useToggler } from '@cbhq/cds-common';
import { ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { TextBody, TextCaption } from '../../typography';
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
            <TextCaption color="foregroundMuted">50%</TextCaption>
            <ProgressBar progress={0.5} />
            <TextBody>
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </TextBody>
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
