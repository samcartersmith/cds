import React from 'react';
import { VStack } from '@cbhq/cds-web/layout';
import { Link, TextBody } from '@cbhq/cds-web/typography';

import { AnnouncementCard } from ':cds-website/components/AnnouncementCard';

export const IconAnnouncement = function IconAnnouncement() {
  return (
    <AnnouncementCard
      backgroundColor="primaryWash"
      body={
        <VStack>
          <TextBody as="p" spacingBottom={1}>
            Icons and Illustrations are released the first <strong>Wednesday of each month</strong>.
            For the icon to be included in this cycle, the request must be submitted{' '}
            <TextBody as="strong" color="negative">
              <strong>
                before 1pm the Tuesday before the first Wednesday of the month (a day before the
                release)
              </strong>
            </TextBody>
            .
          </TextBody>
          <TextBody as="p" spacingBottom={1}>
            To see Icons released this cycle, check{' '}
            <Link to="https://cds.cbhq.net/changelog/icons/">Icon Changelog</Link>
          </TextBody>
          <TextBody as="p" spacingBottom={1}>
            If request is <strong>urgent</strong>:
            <ol>
              <li>
                fill{' '}
                <Link to="https://jira.coinbase-corp.com/secure/CreateIssueDetails!init.jspa?pid=15203&issuetype=3&priority=4&labels=Illustration&labels=Icon&labels=Request&components=20226&assignee=dominic.flask@coinbase.com&summary=%5BIllustration%20or%20Icon%20Request%5D%20&description=(_Please%20make%20sure%20you%E2%80%99re%20requesting%20support%20at%20least%202%20weeks%20prior%20to%20the%20due%20date.%20%20Please%20be%20as%20descriptive%20as%20possible,%20this%20will%20set%20up%20the%20Illustration%20Team%20for%20success._)%20%0A%0A*Estimated%20Scope:*%20(_Ideal%20delivery%20date?%20Any%20important%20dates%20we%20should%20know?_)%0A%0A*Project%20Description:*%20(_Provide%20brief,%20examples,%20and%20DRI%E2%80%99s_)%0A%0A*Resources:*%20(_Provide%20links,%20Figma,%20decks,%20documentation_)">
                  go/icon-request
                </Link>{' '}
                form
              </li>
              <li>
                Attach the ticket to message and ping{' '}
                <Link to="https://coinbase.slack.com/archives/C05H922EYP7">#ask-ui-systems</Link>{' '}
              </li>
            </ol>
          </TextBody>
        </VStack>
      }
      title="Icon Release Cycle"
    />
  );
};
