import Heading from '@theme-original/Heading';
import { TextDisplay3 } from '@cbhq/cds-web/typography/TextDisplay3';

export const MainHeading: React.FC = ({ children }) => (
  <TextDisplay3 as="h1">{children}</TextDisplay3>
);
export default Heading;
