import React from 'react';
import Heading from '@theme-init/Heading';
import { TextDisplay3 } from '@cbhq/cds-web/typography/TextDisplay3';

export const MainHeading: React.FC = ({ children }) => (
  <TextDisplay3 as="h1">{children}</TextDisplay3>
);
export default Heading;
