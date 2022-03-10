import React, { memo } from 'react';
import { FeedCardBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { RemoteImage } from '../media/RemoteImage';

const aspectRatio = [240, 120] as [number, number];

export const FeedCard: React.FC<FeedCardBaseProps> = memo(
  ({
    avatarUrl,
    headerMetaData,
    headerDescription,
    headerActionNode,
    bodyTitle,
    bodyDescription,
    bodyMediaUrl,
    bodyOrientation,
    footerActions,
    testID,
  }) => {
    return (
      <Card testID={testID}>
        <CardHeader
          avatarUrl={avatarUrl}
          metaData={headerMetaData}
          description={headerDescription}
          action={headerActionNode}
        />
        <CardBody
          title={bodyTitle}
          description={bodyDescription}
          media={
            <RemoteImage
              source={bodyMediaUrl}
              height="auto"
              width="100%"
              aspectRatio={aspectRatio}
            />
          }
          orientation={bodyOrientation}
        />
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    );
  },
);
