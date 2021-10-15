import React from 'react';
import { FeedCardBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { RemoteImage } from '../media/RemoteImage';

const aspectRatio = [240, 120] as [number, number];

export const FeedCard: React.FC<FeedCardBaseProps> = ({
  avatarUrl,
  headerMetaData,
  headerDescription,
  headerActionNode,
  bodyTitle,
  bodyDescription,
  bodyMediaUrl,
  bodyOrientation,
  footerActions,
}) => {
  return (
    <Card>
      <CardHeader
        avatarUrl={avatarUrl}
        metaData={headerMetaData}
        description={headerDescription}
        action={headerActionNode}
        spacing={2}
      />
      <CardBody
        title={bodyTitle}
        description={bodyDescription}
        media={
          <RemoteImage source={bodyMediaUrl} height="auto" width="100%" aspectRatio={aspectRatio} />
        }
        spacing={2}
        orientation={bodyOrientation}
      />
      <CardFooter spacing={2}>{footerActions}</CardFooter>
    </Card>
  );
};
