import { createRoot } from 'react-dom/client';

import App from './App';

// eslint-disable-next-line no-restricted-globals
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
