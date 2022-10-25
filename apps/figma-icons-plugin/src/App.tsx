/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-globals */
import 'react-figma-plugin-ds/figma-plugin-ds.css';
import './styles.css';

import React, { useCallback, useRef, useState } from 'react';
import { Button, Text, Title } from 'react-figma-plugin-ds';

import type { Density, FigmaMessage } from './types';

type ClassName = string | false | undefined | null | 0;

function cx(...classNames: ClassName[]) {
  return classNames.filter(Boolean).join(' ');
}

function App() {
  const [densitySelection, setDensitySelection] = useState<Density | undefined>();
  const normalSelector = useRef<HTMLButtonElement>(null);
  const denseSelector = useRef<HTMLButtonElement>(null);
  const handlePostMessage = useCallback((pluginMessage: FigmaMessage) => {
    return () => {
      if (window) {
        window.parent.postMessage(
          {
            pluginMessage,
          },
          '*',
        );
      }
    };
  }, []);

  const handleDensitySelection = useCallback((selection: Density) => {
    return () => {
      setDensitySelection(selection);
    };
  }, []);

  const handleClickOutside = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (![denseSelector.current, normalSelector.current].includes(e.target)) {
      setDensitySelection(undefined);
    }
  }, []);

  return (
    <div className="App" tabIndex={-1} onClick={handleClickOutside}>
      <Title size="large" weight="bold">
        Library
      </Title>

      <div className="button-wrapper">
        <button
          ref={normalSelector}
          className={cx(`button-reset`, densitySelection === 'normal' && 'active-selection')}
          onClick={handleDensitySelection('normal')}
        >
          <Text>Normal components</Text>
        </button>
        <button
          ref={denseSelector}
          className={cx(`button-reset`, densitySelection === 'dense' && 'active-selection')}
          onClick={handleDensitySelection('dense')}
        >
          <Text>Dense components</Text>
        </button>
      </div>
      <div className="divider" />
      <div className="selection-controls">
        <Button
          onClick={
            densitySelection
              ? handlePostMessage({
                  type: `create-${densitySelection}-icons` as const,
                })
              : undefined
          }
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default App;
