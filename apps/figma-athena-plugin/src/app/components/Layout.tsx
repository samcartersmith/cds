import { ComponentProps } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { VStack } from '@cbhq/cds-web/layout';

export function Layout(props: ComponentProps<typeof VStack>) {
  return (
    <VStack background="backgroundAlternate" height="100vh" spacingHorizontal={gutter} {...props} />
  );
}
