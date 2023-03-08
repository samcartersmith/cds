/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-restricted-globals */
import 'react-figma-plugin-ds/figma-plugin-ds.css';
import './styles.css';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Select, SelectOption, Text, Title } from 'react-figma-plugin-ds';

import type { FigmaContext, FigmaMessage, Spectrum } from './types';

type ClassName = string | false | undefined | null | 0;
function cx(...classNames: ClassName[]) {
  return classNames.filter(Boolean).join(' ');
}

function App() {
  const [contextOption, setContextOption] = useState<FigmaContext>('selection');
  const [colorSelection, setColorSelection] = useState<Spectrum | undefined>();
  const lightColorSelector = useRef<HTMLButtonElement>(null);
  const darkColorSelector = useRef<HTMLButtonElement>(null);
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

  const handleColorSelection = useCallback((selection: Spectrum) => {
    return () => {
      setColorSelection(selection);
    };
  }, []);

  const handleClickOutside = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // @ts-expect-error typing for event propagation is not possible
    if (![darkColorSelector.current, lightColorSelector.current].includes(e.target)) {
      setColorSelection(undefined);
    }
  }, []);

  const handleContextChange = useCallback((option: SelectOption) => {
    setContextOption(option.value as FigmaContext);
  }, []);

  const selectionOptions = useMemo(() => {
    return [
      {
        label: 'Apply to selection',
        value: 'selection',
      },
      {
        label: 'Apply to page',
        value: 'page',
      },
    ];
  }, []);

  return (
    <div className="App" tabIndex={-1} onClick={handleClickOutside}>
      <Title size="large" weight="bold">
        Themes
      </Title>

      <div className="button-wrapper">
        <button
          key="light-color-selector"
          ref={lightColorSelector}
          className={cx(`button-reset`, colorSelection === 'light' && 'active-selection')}
          onClick={handleColorSelection('light')}
        >
          <Text>🌞 light</Text>
        </button>
        <button
          key="dark-color-selector"
          ref={darkColorSelector}
          className={cx(`button-reset`, colorSelection === 'dark' && 'active-selection')}
          onClick={handleColorSelection('dark')}
        >
          <Text>🌚 dark</Text>
        </button>
      </div>
      <div className="divider" />
      <div className="selection-controls">
        <Select
          defaultValue={contextOption}
          onChange={handleContextChange}
          options={selectionOptions}
          placeholder="Apply to selection"
        />
        <Button
          onClick={
            colorSelection
              ? handlePostMessage({
                  type: `toggle-${colorSelection}-styles` as const,
                  context: contextOption,
                })
              : undefined
          }
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default App;
