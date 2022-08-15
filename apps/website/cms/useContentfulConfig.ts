import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type ContentfulOptions = {
  accessToken: string;
  space: string;
  host: string;
  clientKey?: string;
};

export function useContentfulConfig() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return customFields?.contentful as ContentfulOptions;
}
