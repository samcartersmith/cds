import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('root');
  if (!node) throw Error('Missing root');
  const root = createRoot(node);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
