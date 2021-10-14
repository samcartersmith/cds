import React from 'react';
import { TextTitle3 } from '@cbhq/cds-web/typography';

type BetaWarningProps = {
  component: string;
};

export const BetaWarning: React.FC<BetaWarningProps> = ({ component }) => {
  return (
    <TextTitle3 as="h3" color="negative">
      🚨 BETA: {component} is likely to change. Production use in Beta is strongly discouraged
    </TextTitle3>
  );
};
