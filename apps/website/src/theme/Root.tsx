import { PropsTOCProvider } from '@theme/PropsTOCManager';
import { TOCProvider } from '@theme/TOCManager';

const Root: React.FC = ({ children }) => {
  return (
    <TOCProvider>
      <PropsTOCProvider>{children}</PropsTOCProvider>;
    </TOCProvider>
  );
};

export default Root;
