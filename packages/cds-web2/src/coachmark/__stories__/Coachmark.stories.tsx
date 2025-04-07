import React, { useState } from 'react';
import { ethBackground } from '@cbhq/cds-common2/internal/data/assets';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations';
import { Coachmark } from '../Coachmark';

export const CoachmarkExamples = () => {
  const [checked, setChecked] = useState(false);

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
          <Checkbox checked={checked} onChange={() => setChecked((s) => !s)}>
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
            <Text as="p" color="fgMuted" display="block" font="caption">
              50%
            </Text>
            <ProgressBar progress={0.5} />
            <Text as="p" display="block" font="body">
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </Text>
          </VStack>
        }
        media={<RemoteImage height={150} source={ethBackground} width="100%" />}
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

export default {
  title: 'Core Components/Coachmark',
  component: Coachmark,
};
