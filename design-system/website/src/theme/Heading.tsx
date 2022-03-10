import { TextDisplay3 } from '@cbhq/cds-web/typography/TextDisplay3';
import Heading from '@theme-original/Heading';

export const MainHeading: React.FC = ({ children }) => (
  <TextDisplay3 as="h1">{children}</TextDisplay3>
);
export default Heading;
