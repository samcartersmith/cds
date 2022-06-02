import CdsProviders from '@theme/CdsProviders';
import KBar from '@theme/KBar';
import Layout from '@theme-original/Layout';

const LayoutOverride: React.FC = ({ children }) => {
  return (
    <Layout>
      <CdsProviders>
        <KBar>{children}</KBar>
      </CdsProviders>
    </Layout>
  );
};

export default LayoutOverride;
