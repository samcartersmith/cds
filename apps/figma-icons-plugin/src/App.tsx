import 'react-figma-plugin-ds/figma-plugin-ds.css';
import './styles.css';

import { useCallback, useRef, useState } from 'react';
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
    // @ts-expect-error typing for event propagation is not possible
    if (![denseSelector.current, normalSelector.current].includes(e.target)) {
      setDensitySelection(undefined);
    }
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="App" onClick={handleClickOutside} tabIndex={-1}>
      <Title size="large" weight="bold">
        Library
      </Title>

      <div className="button-wrapper">
        <button
          key="normal-selector"
          ref={normalSelector}
          className={cx(`button-reset`, densitySelection === 'normal' && 'active-selection')}
          onClick={handleDensitySelection('normal')}
          type="button"
        >
          <Text>Normal components</Text>
        </button>
        <button
          key="dense-selector"
          ref={denseSelector}
          className={cx(`button-reset`, densitySelection === 'dense' && 'active-selection')}
          onClick={handleDensitySelection('dense')}
          type="button"
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
