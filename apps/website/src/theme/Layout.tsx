import CdsProviders from '@theme/CdsProviders';
import Layout from '@theme-original/Layout';

const LayoutOverride: React.FC = ({ children }) => {
  return (
    <Layout>
      <CdsProviders>{children}</CdsProviders>
    </Layout>
  );
};

export default LayoutOverride;
