import { RightSidebarProvider } from './RightSidebar';

const Root: React.FC = ({ children }) => {
  return <RightSidebarProvider>{children}</RightSidebarProvider>;
};

export default Root;
