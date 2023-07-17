import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { Link, TextBody } from '@cbhq/cds-web/typography';

import { AnnouncementCard } from ':cds-website/components/AnnouncementCard';

export const IllustrationAnnouncement = function IllustrationAnnouncement() {
  return (
    <AnnouncementCard
      title="Illustration Release Cycle"
      backgroundColor="primaryWash"
      body={
        <VStack>
          <TextBody as="p" spacingBottom={1}>
            Illustrations are released the <strong>first Wednesday of the month</strong>. For the
            illustration to be included in this cycle, the request must be submitted{' '}
            <TextBody as="strong" color="negative">
              <strong>
                before 1pm on Tuesday before the first Wednesday of the month (a day before the
                release)
              </strong>
            </TextBody>
            .
          </TextBody>
          <TextBody as="p" spacingBottom={1}>
            To see Illustrations released this cycle, check{' '}
            <Link to="https://cds.cbhq.net/changelog/illustrations/">Illustration Changelog</Link>
          </TextBody>
          <TextBody as="p" spacingBottom={1}>
            If request is <strong>urgent</strong>: ping{' '}
            <Link to="https://coinbase.slack.com/archives/C05H922EYP7">#ask-ui-systems</Link>
          </TextBody>
        </VStack>
      }
    />
  );
};
