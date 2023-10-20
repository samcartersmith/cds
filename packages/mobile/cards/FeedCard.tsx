import React, { memo } from 'react';
import { FeedCardBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { RemoteImage } from '../media/RemoteImage';

import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';

const aspectRatio = [240, 120] as [number, number];

export const FeedCard: React.FC<React.PropsWithChildren<FeedCardBaseProps>> = memo(
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
          action={headerActionNode}
          avatarUrl={avatarUrl}
          description={headerDescription}
          metaData={headerMetaData}
        />
        <CardBody
          description={bodyDescription}
          media={
            <RemoteImage
              aspectRatio={aspectRatio}
              height="auto"
              resizeMode="cover"
              source={{ uri: bodyMediaUrl }}
              width="100%"
            />
          }
          orientation={bodyOrientation}
          title={bodyTitle}
        />
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    );
  },
);
