import { createCardFooter } from '@cbhq/cds-common/cards/createCardFooter';

import { HStack } from '../layout/HStack';

export type CardFooterProps = React.ComponentProps<typeof CardFooter>;

export const CardFooter = createCardFooter({
  HStack,
});
