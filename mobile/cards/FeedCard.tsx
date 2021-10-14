import React from 'react';
import { FeedCardBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { RemoteImage } from '../media/RemoteImage';

export const FeedCard: React.FC<FeedCardBaseProps> = ({
  avatarUrl,
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
      <CardHeader avatarUrl={avatarUrl} description={headerDescription} action={headerActionNode} />
      <CardBody
        title={bodyTitle}
        description={bodyDescription}
        media={
          <RemoteImage source={{ uri: bodyMediaUrl }} height={224} width={380} resizeMode="cover" />
        }
        spacing={3}
        orientation={bodyOrientation}
      />
      <CardFooter spacing={3}>{footerActions}</CardFooter>
    </Card>
  );
};
