import Layout from '@theme-original/Layout';

import { CdsProviders } from ':cds-website/components/CdsProviders';

const LayoutOverride: React.FC = ({ children }) => {
  return (
    <Layout>
      <CdsProviders>{children}</CdsProviders>
    </Layout>
  );
};

export default LayoutOverride;
