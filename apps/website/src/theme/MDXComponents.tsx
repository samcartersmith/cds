import MDXComponents from '@theme-original/MDXComponents';

import { ComponentPage, LandingPage } from ':cds-website/cms';
import DocgenModalLink from ':cds-website/components/DocgenModalLink';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  ComponentPage,
  LandingPage,
  DocgenModalLink,
};

export default MDXComponentOverrides;
