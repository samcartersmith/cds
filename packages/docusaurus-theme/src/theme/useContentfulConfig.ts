import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useContentfulConfig() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return customFields?.contentful;
}
