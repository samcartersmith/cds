import BrowserOnly from '@docusaurus/BrowserOnly';

import { RightSidebarProvider } from './RightSidebar';

const Root: React.FC = ({ children }) => {
  return <BrowserOnly>{() => <RightSidebarProvider>{children}</RightSidebarProvider>}</BrowserOnly>;
};

export default Root;
