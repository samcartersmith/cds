import type { ReactTestInstance } from 'react-test-renderer';

import type Help from './Help';

type Rule = {
  id: string;
  matcher: (node: ReactTestInstance) => boolean;
  assertion: (node: ReactTestInstance) => boolean;
  help: Help;
};
export default Rule;
