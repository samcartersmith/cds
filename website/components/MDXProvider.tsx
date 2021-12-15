import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';
import {
  TextDisplay3,
  TextTitle1,
  TextTitle3,
  TextBody,
  TextProps,
} from '@cbhq/cds-web/typography';

const components = {
  h1: (props: TextProps) => <TextDisplay3 as="h1" {...props} />,
  h2: (props: TextProps) => <TextTitle1 as="h2" {...props} />,
  h3: (props: TextProps) => <TextTitle3 as="h3" {...props} />,
  p: (props: TextProps) => <TextBody as="p" {...props} />,
  li: (props: TextProps) => <TextBody as="li" {...props} />,
};

export const MDXProvider: React.FC = ({ children }) => {
  return <OriginalMDXProvider components={components}>{children}</OriginalMDXProvider>;
};

MDXProvider.displayName = 'MDXProvider';
