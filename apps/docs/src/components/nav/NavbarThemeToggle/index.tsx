import React, { useCallback, useRef } from 'react';
import type { Property } from 'csstype';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { Dropdown } from '@cbhq/cds-web2/dropdown';
import { Box, VStack } from '@cbhq/cds-web2/layout';
import { Pressable } from '@cbhq/cds-web2/system';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

import {
  useDocsTheme,
  usePlaygroundTheme,
} from '../../../theme/Layout/Provider/UnifiedThemeContext';

type ThemeOption = {
  label: string;
  lightValue: Property.Color;
  darkValue: Property.Color;
};

const themeOptions: ThemeOption[] = [
  {
    label: 'Green theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.green50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.green60})`,
  },
  {
    label: 'Red theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.red50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.red60})`,
  },
  {
    label: 'Purple theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.purple50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.purple60})`,
  },
  {
    label: 'Blue theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.blue50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.blue70})`,
  },
] as const;

const NavbarThemeToggle = () => {
  const { theme: docsTheme, setTheme: setDocsTheme, colorScheme } = useDocsTheme();
  const { setTheme: setPlaygroundTheme } = usePlaygroundTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTheme = useCallback(
    (themeOption: ThemeOption) => {
      const newDocsTheme = {
        ...docsTheme,
        light: {
          ...defaultTheme.light,
          ...docsTheme.light,
          bgPrimary: themeOption.lightValue,
          fgPrimary: themeOption.lightValue,
        },
        dark: {
          ...defaultTheme.dark,
          ...docsTheme.dark,
          bgPrimary: themeOption.darkValue,
          fgPrimary: themeOption.darkValue,
        },
      } satisfies ThemeConfig;

      const newPlaygroundTheme = {
        ...defaultTheme,
        light: {
          ...defaultTheme.light,
          bgPrimary: themeOption.lightValue,
          fgPrimary: themeOption.lightValue,
        },
        dark: {
          ...defaultTheme.dark,
          bgPrimary: themeOption.darkValue,
          fgPrimary: themeOption.darkValue,
        },
      } satisfies ThemeConfig;

      setDocsTheme(newDocsTheme);
      setPlaygroundTheme(newPlaygroundTheme);
    },
    [docsTheme, setDocsTheme, setPlaygroundTheme],
  );

  /**
   * Handles keyboard interactions (Enter/Space) for accessibility.
   * When a valid key is pressed, prevents default behavior and
   * triggers the same flow as clicking the theme option.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, themeOption: ThemeOption) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        updateTheme(themeOption);
      }
    },
    [updateTheme],
  );

  const handleOpen = () => {
    setTimeout(() => {
      containerRef.current?.querySelector<HTMLElement>('button')?.focus();
    }, 1);
  };

  const currentColor = docsTheme[colorScheme]?.bgPrimary;

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
                aria-label={themeOption.label}
                aria-checked={currentColor === color}
                as="button"
                borderRadius={1000}
                height={16}
                onClick={() => updateTheme(themeOption)}
                onKeyDown={(event) => handleKeyDown(event, themeOption)}
                style={{
                  background: color,
                  cursor: 'pointer',
                  border: currentColor === color ? '2px solid currentColor' : 'none',
                }}
                tabIndex={0}
                width={16}
                role="radio"
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
        aria-label="Current theme color"
        as="button"
        background="bgSecondary"
        borderRadius={1000}
        height={40}
        justifyContent="center"
        style={{ cursor: 'pointer' }}
        width={40}
        onClick={handleOpen}
      >
        <Box background="bgPrimary" borderRadius={1000} padding={1} />
      </Pressable>
    </Dropdown>
  );
};

export default NavbarThemeToggle;
