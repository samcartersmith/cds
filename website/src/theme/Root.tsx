import React from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';

const Root: React.FC = ({ children }) => {
  return <BrowserOnly>{() => children}</BrowserOnly>;
};

export default Root;
