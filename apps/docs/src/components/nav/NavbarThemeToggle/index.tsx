import React, { useCallback, useRef } from 'react';
import {
  themeOptions,
  useDocsTheme,
  useUnifiedTheme,
} from '@site/src/theme/Layout/Provider/UnifiedThemeContext';
import type { Property } from 'csstype';
import { Dropdown } from '@cbhq/cds-web2/dropdown';
import { Box, VStack } from '@cbhq/cds-web2/layout';
import { Pressable } from '@cbhq/cds-web2/system';

type ThemeOption = {
  label: string;
  lightValue: Property.Color;
  darkValue: Property.Color;
};

const NavbarThemeToggle = () => {
  const { theme: docsTheme, colorScheme } = useDocsTheme();
  const { setThemeOption } = useUnifiedTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  /**
   * Handles keyboard interactions (Enter/Space) for accessibility.
   * When a valid key is pressed, prevents default behavior and
   * triggers the same flow as clicking the theme option.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, themeOption: ThemeOption) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setThemeOption(themeOption);
      }
    },
    [setThemeOption],
  );

  const handleOpen = () => {
    setTimeout(() => {
      containerRef.current?.querySelector<HTMLElement>('button')?.focus();
    }, 1);
  };

  const colorKey = `${colorScheme}Color` as const;
  const currentColor = docsTheme[colorKey]?.bgPrimary;

  return (
    <Dropdown
      aria-label="Open theme color selector"
      content={
        <VStack
          ref={containerRef}
          alignItems="center"
          alignSelf="center"
          aria-label="Theme color options"
          background="bgSecondary"
          gap={1.5}
          padding={1.5}
          role="radiogroup"
        >
          {themeOptions.map((themeOption) => {
            const color = colorScheme === 'light' ? themeOption.lightValue : themeOption.darkValue;
            return (
              <Box
                key={themeOption.label}
                aria-checked={currentColor === color}
                aria-label={themeOption.label}
                as="button"
                borderRadius={1000}
                height={16}
                onClick={() => setThemeOption(themeOption)}
                onKeyDown={(event) => handleKeyDown(event, themeOption)}
                role="radio"
                style={{
                  background: color,
                  cursor: 'pointer',
                  border: currentColor === color ? '2px solid currentColor' : 'none',
                }}
                tabIndex={0}
                width={16}
              />
            );
          })}
        </VStack>
      }
      contentPosition={{ gap: 0.5, skid: 0 }}
      value={currentColor}
    >
      <Pressable
        alignContent="center"
        alignItems="center"
        aria-label="Edit theme color"
        as="button"
        background="bgSecondary"
        borderRadius={1000}
        height={40}
        justifyContent="center"
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
        width={40}
      >
        <Box background="bgPrimary" borderRadius={1000} padding={1} />
      </Pressable>
    </Dropdown>
  );
};

export default NavbarThemeToggle;
