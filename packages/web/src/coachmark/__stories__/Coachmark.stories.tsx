import { useToggler } from '@cbhq/cds-common';
import { ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Box, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { TextBody, TextCaption } from '../../typography';
import { ProgressBar } from '../../visualizations';
import { Coachmark } from '../Coachmark';
import { SpotRectangle } from '../../illustrations';

export const CoachmarkExamples = () => {
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
            <TextCaption as="p" color="foregroundMuted">
              50%
            </TextCaption>
            <ProgressBar progress={0.5} />
            <TextBody as="p">
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </TextBody>
          </VStack>
        }
        media={
          <RemoteImage
            height={150}
            source={ethBackground}
            width="100%"
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          />
        }
        onClose={noop}
        title="Rich Content"
      />
      <Coachmark
        action={<Button>Next</Button>}
        content="This SpotRectangle is in a Box with primary background."
        media={
          <Box background="primary" alignItems="center" justifyContent="center" spacing={4}>
            <SpotRectangle name="defiEarn" />
          </Box>
        }
        title="With a SpotRectangle"
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
