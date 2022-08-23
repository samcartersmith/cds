import MDXComponents from '@theme-original/MDXComponents';

import { LandingPage, Page } from ':cds-website/cms';
import DocgenModalLink from ':cds-website/components/DocgenModalLink';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  LandingPage,
  Page,
  DocgenModalLink,
};

export default MDXComponentOverrides;
