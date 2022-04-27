import { Spectrum } from '../../types';
import { PaletteConfig } from '../../types/Palette';
import { PaletteConfigWithInteractableTokens } from '../../types/ThemeConfig';
import { paletteConfigToInteractableTokens } from '../paletteConfigToInteractableTokens';

const config: PaletteConfig = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray0',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
};

const expectedWebDarkTokens: PaletteConfigWithInteractableTokens = {
  foreground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(103, 104, 105)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(226, 226, 226)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(211, 211, 211)',
    },
  },
  foregroundMuted: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(59, 62, 68)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  background: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  backgroundAlternate: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(14, 15, 18)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(25, 26, 30)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(39, 40, 43)',
    },
  },
  backgroundOverlay: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(80, 82, 87)',
    },
    hovered: {
      contentOpacity: 0.9,
      backgroundColor: 'rgb(175, 179, 188)',
    },
    pressed: {
      contentOpacity: 0.84,
      backgroundColor: 'rgb(164, 168, 176)',
    },
  },
  line: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(59, 62, 68)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  lineHeavy: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(59, 62, 68)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(147, 154, 166)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(154, 160, 172)',
    },
  },
  primary: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(27, 51, 101)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(71, 126, 246)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(83, 135, 246)',
    },
  },
  primaryWash: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(6, 13, 27)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(5, 21, 55)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(20, 35, 67)',
    },
  },
  primaryForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  negative: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(97, 44, 49)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(241, 110, 121)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(242, 119, 129)',
    },
  },
  negativeForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  positive: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(21, 73, 53)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(56, 180, 128)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(69, 184, 136)',
    },
  },
  positiveForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  secondary: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(10, 11, 13)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(15, 16, 18)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(30, 31, 32)',
    },
  },
  secondaryForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(103, 104, 105)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(226, 226, 226)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(211, 211, 211)',
    },
  },
  transparent: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'transparent',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'transparent',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'transparent',
    },
  },
};

const expectedWebLightTokens: PaletteConfigWithInteractableTokens = {
  foreground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(162, 162, 163)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(39, 40, 42)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(54, 55, 57)',
    },
  },
  foregroundMuted: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(193, 195, 200)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  background: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  backgroundAlternate: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(249, 249, 250)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(233, 235, 238)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(220, 222, 225)',
    },
  },
  backgroundOverlay: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(177, 178, 181)',
    },
    hovered: {
      contentOpacity: 0.9,
      backgroundColor: 'rgb(71, 73, 80)',
    },
    pressed: {
      contentOpacity: 0.84,
      backgroundColor: 'rgb(83, 85, 92)',
    },
  },
  line: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(193, 195, 200)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  lineHeavy: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(193, 195, 200)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(85, 90, 102)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(80, 85, 96)',
    },
  },
  primary: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(158, 189, 255)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(1, 76, 236)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(1, 72, 221)',
    },
  },
  primaryWash: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(251, 252, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(240, 243, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(226, 229, 236)',
    },
  },
  primaryForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  negative: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(237, 170, 176)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(191, 30, 44)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(179, 29, 42)',
    },
  },
  negativeForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  positive: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(162, 209, 189)',
    },
    hovered: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(9, 123, 76)',
    },
    pressed: {
      contentOpacity: 0.86,
      backgroundColor: 'rgb(9, 116, 71)',
    },
  },
  positiveForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  secondary: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    hovered: {
      contentOpacity: 0.98,
      backgroundColor: 'rgb(250, 250, 250)',
    },
    pressed: {
      contentOpacity: 0.92,
      backgroundColor: 'rgb(235, 235, 236)',
    },
  },
  secondaryForeground: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'rgb(162, 162, 163)',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'rgb(39, 40, 42)',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'rgb(54, 55, 57)',
    },
  },
  transparent: {
    disabled: {
      contentOpacity: 0.38,
      backgroundColor: 'transparent',
    },
    hovered: {
      contentOpacity: 0.88,
      backgroundColor: 'transparent',
    },
    pressed: {
      contentOpacity: 0.82,
      backgroundColor: 'transparent',
    },
  },
};

const convertInteractableTokensToMobile = (
  webInteractableTokens: PaletteConfigWithInteractableTokens,
) =>
  Object.entries(webInteractableTokens)
    .map(([key, value]) => ({
      [key]: {
        ...value,
        hovered: undefined,
      },
    }))
    .reduce((previous, current) => {
      return { ...previous, ...current };
    }, {} as PaletteConfigWithInteractableTokens);

const expectedMobileDarkTokens = convertInteractableTokensToMobile(expectedWebDarkTokens);
const expectedMobileLightTokens = convertInteractableTokensToMobile(expectedWebLightTokens);

type BaseArgs = { paletteConfig: PaletteConfig; isWeb: boolean };

const darkTests = (baseArgs: BaseArgs) => {
  describe('When dark spectrum', () => {
    const darkArgs: BaseArgs & { spectrum: Spectrum } = {
      ...baseArgs,
      spectrum: 'dark',
    };

    it('When frontier is false', () => {
      const expected = baseArgs.isWeb ? expectedWebDarkTokens : expectedMobileDarkTokens;
      expect(paletteConfigToInteractableTokens({ ...darkArgs, hasFrontier: false })).toEqual(
        expected,
      );
    });

    it('When frontier is true', () => {
      const expected = baseArgs.isWeb ? expectedWebDarkTokens : expectedMobileDarkTokens;
      expect(paletteConfigToInteractableTokens({ ...darkArgs, hasFrontier: true })).toEqual(
        expected,
      );
    });
  });
};

const lightTests = (baseArgs: BaseArgs) => {
  describe('When light spectrum', () => {
    const lightArgs: BaseArgs & { spectrum: Spectrum } = {
      ...baseArgs,
      spectrum: 'light',
    };
    it('When frontier is false', () => {
      const expected = baseArgs.isWeb ? expectedWebLightTokens : expectedMobileLightTokens;
      expect(paletteConfigToInteractableTokens({ ...lightArgs, hasFrontier: false })).toEqual(
        expected,
      );
    });

    it('When frontier is true', () => {
      const expected = baseArgs.isWeb ? expectedWebLightTokens : expectedMobileLightTokens;
      expect(paletteConfigToInteractableTokens({ ...lightArgs, hasFrontier: true })).toEqual(
        expected,
      );
    });
  });
};

describe('paletteConfigToInteractableTokens on web', () => {
  const baseArgs: BaseArgs = {
    paletteConfig: config,
    isWeb: true,
  };

  darkTests(baseArgs);
  lightTests(baseArgs);
});

describe('paletteConfigToInteractableTokens on mobile', () => {
  const baseArgs: BaseArgs = {
    paletteConfig: config,
    isWeb: false,
  };

  darkTests(baseArgs);
  lightTests(baseArgs);
});
