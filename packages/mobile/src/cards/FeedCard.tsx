import React, { memo } from 'react';
import { FeedCardBaseProps } from '@cbhq/cds-common/src/types/CardBaseProps';

import { RemoteImage } from '../media/RemoteImage';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';

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
              source={{ uri: bodyMediaUrl }}
              height="auto"
              width="100%"
              aspectRatio={aspectRatio}
              resizeMode="cover"
            />
          }
          orientation={bodyOrientation}
        />
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    );
  },
);
