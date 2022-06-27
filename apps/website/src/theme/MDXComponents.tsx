import MDXComponents from '@theme-original/MDXComponents';

import DocgenModalLink from ':cds-website/components/DocgenModalLink';

const MDXComponentOverrides = {
  ...(MDXComponents as unknown as Record<string, () => JSX.Element>),
  DocgenModalLink,
};

export default MDXComponentOverrides;
