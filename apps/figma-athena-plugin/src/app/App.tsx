/* eslint-disable react/jsx-no-constructed-context-values */
import './styles.css';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';

import { Chat } from './components/Chat';
import { DeletePrompt } from './components/DeletePrompt';
import { EditPrompt } from './components/EditPrompt';
import { Layout } from './components/Layout';
import { PromptList } from './components/PromptList';
import { Route } from './components/Router';
import { GlobalStateContextProvider } from './hooks/useGlobalState';
import { type Routes, RouterContext } from './hooks/useRouter';
import { FigmaNodeList } from './views/FigmaNodeSelection/FigmaNodeList';

export const App = () => {
  const [route, setRoute] = useState<Routes>('prompt-list');
  const [routeState, setRouteState] = useState<Record<string, unknown>>({});
  const [history, setHistory] = useState<Routes[]>(['prompt-list']);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.className.includes('figma-dark'),
  );

  // handles keeping CDS theme in sync with the Figma UI's theme
  useEffect(() => {
    // Select the element to observe
    const targetElement = document.documentElement;

    if (targetElement) {
      // Create a MutationObserver instance
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setIsDarkMode(targetElement.className.includes('figma-dark'));
          }
        }
      });

      // Configure the observer to watch for attribute changes
      const config = { attributes: true };

      // Start observing the element
      observer.observe(targetElement, config);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const navigate = (route: Routes, state?: Record<string, unknown>) => {
    if (history[history.length - 1] !== route) {
      // Limit history to length 100
      const newHistory = history.length + 1 > 100 ? history.slice(1, 100) : history;
      setHistory([...newHistory, route]);
    }
    setRouteState(state ?? {});
    setRoute(route);
  };

  const goBack = () => {
    if (!history.length) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setRoute(newHistory[newHistory.length - 1]);
  };

  return (
    <ThemeProvider spectrum={isDarkMode ? 'dark' : 'light'}>
      <Layout>
        <RouterContext.Provider value={{ route, history, state: routeState, navigate, goBack }}>
          <GlobalStateContextProvider>
            <Route requireCredentials path="prompt-list">
              <PromptList />
            </Route>
            <Route requireCredentials path="edit-prompt">
              <EditPrompt />
            </Route>
            <Route requireCredentials path="delete-prompt">
              <DeletePrompt />
            </Route>
            <Route requireCredentials path="select-nodes">
              <FigmaNodeList />
            </Route>
            <Route requireCredentials path="generate-descriptors">
              <Chat />
            </Route>
          </GlobalStateContextProvider>
        </RouterContext.Provider>
      </Layout>
    </ThemeProvider>
  );
};
