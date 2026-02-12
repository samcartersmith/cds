import { Project } from 'ts-morph';

import { type ComponentImportStat } from '../../types';
import {
  getExternalComponentImportStats,
  getIllustrationNames,
  isPresentationalComponent,
} from '../componentHelpers';

function createSourceFile(code: string) {
  const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { jsx: 2 } });
  return project.createSourceFile('test.tsx', code);
}

describe('getExternalComponentImportStats', () => {
  const cdsVersions: Record<string, string> = {
    '@cbhq/cds-web': '^8.0.0',
    '@cbhq/cds-mobile': '^8.0.0',
    '@cbhq/cds-icons': '^5.0.0',
    '@cbhq/cds-illustrations': '^4.0.0',
    '@coinbase/cds-web': '^8.0.0',
    '@coinbase/cds-mobile': '^8.0.0',
  };

  it('returns stat for a named import used in JSX', () => {
    const deps = new Set<unknown>(['some-lib']);
    const sourceFile = createSourceFile(`
      import { Button } from 'some-lib';
      const App = () => <Button />;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, {});
    expect(result).toEqual([{ name: 'Button', importPath: 'some-lib', version: undefined }]);
  });

  it('returns nothing for a named import not used as JSX', () => {
    const deps = new Set<unknown>(['some-lib']);
    const sourceFile = createSourceFile(`
      import { formatDate } from 'some-lib';
      const d = formatDate();
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, {});
    expect(result).toEqual([]);
  });

  it('returns stat for a default import used in JSX', () => {
    const deps = new Set<unknown>(['some-lib']);
    const sourceFile = createSourceFile(`
      import Card from 'some-lib';
      const App = () => <Card title="hi" />;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, {});
    expect(result).toEqual([{ name: 'Card', importPath: 'some-lib', version: undefined }]);
  });

  it('returns stat with alias for an aliased named import used in JSX', () => {
    const deps = new Set<unknown>(['some-lib']);
    const sourceFile = createSourceFile(`
      import { Button as MyButton } from 'some-lib';
      const App = () => <MyButton />;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, {});
    expect(result).toEqual([
      { name: 'Button', alias: 'MyButton', importPath: 'some-lib', version: undefined },
    ]);
  });

  it('skips imports from packages not in packageJsonDependencies', () => {
    const deps = new Set<unknown>(['allowed-lib']);
    const sourceFile = createSourceFile(`
      import { Button } from 'unknown-lib';
      const App = () => <Button />;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, {});
    expect(result).toEqual([]);
  });

  it('correctly parses scoped CDS web package', () => {
    const deps = new Set<unknown>(['@cbhq/cds-web']);
    const sourceFile = createSourceFile(`
      import { Button } from '@cbhq/cds-web';
      const App = () => <Button />;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, cdsVersions);
    expect(result).toEqual([{ name: 'Button', importPath: '@cbhq/cds-web', version: '8.0.0' }]);
  });

  it('strips ^ prefix from cds versions', () => {
    const deps = new Set<unknown>(['@cbhq/cds-web']);
    const sourceFile = createSourceFile(`
      import { Text } from '@cbhq/cds-web';
      const App = () => <Text>hello</Text>;
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, cdsVersions);
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe('8.0.0');
  });

  it('resolves subpath imports to the base package name', () => {
    const deps = new Set<unknown>(['@cbhq/cds-web']);
    const sourceFile = createSourceFile(`
      import { Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
      import { RemoteImage } from '@cbhq/cds-web/media';
      const App = () => (
        <div>
          <SpotSquare name="bank" />
          <Pictogram name="card" />
          <RemoteImage source="url" />
        </div>
      );
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, cdsVersions);
    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        { name: 'SpotSquare', importPath: '@cbhq/cds-web', version: '8.0.0' },
        { name: 'Pictogram', importPath: '@cbhq/cds-web', version: '8.0.0' },
        { name: 'RemoteImage', importPath: '@cbhq/cds-web', version: '8.0.0' },
      ]),
    );
  });

  it('works with @coinbase/ scoped packages', () => {
    const deps = new Set<unknown>(['@coinbase/cds-web']);
    const sourceFile = createSourceFile(`
      import { Button } from '@coinbase/cds-web';
      import { Icon } from '@coinbase/cds-web/icons';
      const App = () => (
        <div>
          <Button variant="primary">Click</Button>
          <Icon name="check" />
        </div>
      );
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, cdsVersions);
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { name: 'Button', importPath: '@coinbase/cds-web', version: '8.0.0' },
        { name: 'Icon', importPath: '@coinbase/cds-web', version: '8.0.0' },
      ]),
    );
  });

  it('extracts components from a real-world file with mixed CDS and non-CDS imports', () => {
    const deps = new Set<unknown>(['@cbhq/cds-web', '@cbhq/data-layer', '@cbhq/shared']);
    const sourceFile = createSourceFile(`
      import { NudgeCard } from '@cbhq/cds-web/cards/NudgeCard';
      import { Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
      import { RemoteImage } from '@cbhq/cds-web/media';
      import { graphql, useMutation } from '@cbhq/data-layer';
      import { notifyError } from '@cbhq/shared/utils/notifyError';

      const App = () => (
        <div>
          <NudgeCard title="hi" />
          <SpotSquare name="cardDeclined" />
          <Pictogram name="cardDeclined" dimension="64x64" />
          <RemoteImage width={120} height={120} source="url" />
        </div>
      );
    `);

    const result = getExternalComponentImportStats(sourceFile, deps, cdsVersions);
    const names = result.map((r) => r.name);

    // CDS components used in JSX
    expect(names).toContain('NudgeCard');
    expect(names).toContain('SpotSquare');
    expect(names).toContain('Pictogram');
    expect(names).toContain('RemoteImage');

    // Non-JSX imports should not appear
    expect(names).not.toContain('graphql');
    expect(names).not.toContain('useMutation');
    expect(names).not.toContain('notifyError');
  });
});

describe('isPresentationalComponent', () => {
  it('returns true for a JsxElement with attributes', () => {
    const sourceFile = createSourceFile(`
      import { Card } from 'external-lib';
      const App = () => <Card title="hello">content</Card>;
    `);
    const importStat: ComponentImportStat = {
      name: 'Card',
      importPath: 'external-lib',
      version: '1.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(true);
  });

  it('returns true for a JsxSelfClosingElement with attributes', () => {
    const sourceFile = createSourceFile(`
      import { Icon } from 'external-lib';
      const App = () => <Icon name="check" size={24} />;
    `);
    const importStat: ComponentImportStat = {
      name: 'Icon',
      importPath: 'external-lib',
      version: '1.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(true);
  });

  it('returns false for a component used with zero attributes', () => {
    const sourceFile = createSourceFile(`
      import { Divider } from 'external-lib';
      const App = () => <Divider />;
    `);
    const importStat: ComponentImportStat = {
      name: 'Divider',
      importPath: 'external-lib',
      version: '1.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(false);
  });

  it('returns false for @cbhq/ import path', () => {
    const sourceFile = createSourceFile(`
      import { Button } from '@cbhq/cds-web';
      const App = () => <Button variant="primary">Click</Button>;
    `);
    const importStat: ComponentImportStat = {
      name: 'Button',
      importPath: '@cbhq/cds-web',
      version: '8.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(false);
  });

  it('returns false for @coinbase/ import path', () => {
    const sourceFile = createSourceFile(`
      import { Button } from '@coinbase/cds-web';
      const App = () => <Button variant="primary">Click</Button>;
    `);
    const importStat: ComponentImportStat = {
      name: 'Button',
      importPath: '@coinbase/cds-web',
      version: '8.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(false);
  });

  it('matches via alias when component is aliased', () => {
    const sourceFile = createSourceFile(`
      import { Button as Btn } from 'external-lib';
      const App = () => <Btn variant="primary" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'Button',
      alias: 'Btn',
      importPath: 'external-lib',
      version: '1.0.0',
    };

    expect(isPresentationalComponent(importStat, sourceFile)).toBe(true);
  });
});

describe('getIllustrationNames', () => {
  it('returns empty array for non-illustration component', () => {
    const sourceFile = createSourceFile(`
      import { Button } from '@cbhq/cds-web';
      const App = () => <Button name="submit" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'Button',
      importPath: '@cbhq/cds-web',
      version: '8.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual([]);
  });

  it('extracts name from self-closing HeroSquare', () => {
    const sourceFile = createSourceFile(`
      import { HeroSquare } from '@cbhq/cds-illustrations';
      const App = () => <HeroSquare name="bank" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'HeroSquare',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['bank']);
  });

  it('extracts name from wrapping SpotSquare', () => {
    const sourceFile = createSourceFile(`
      import { SpotSquare } from '@cbhq/cds-illustrations';
      const App = () => <SpotSquare name="wallet"><div /></SpotSquare>;
    `);
    const importStat: ComponentImportStat = {
      name: 'SpotSquare',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['wallet']);
  });

  it('extracts name from JSX expression value', () => {
    const sourceFile = createSourceFile(`
      import { Pictogram } from '@cbhq/cds-illustrations';
      const App = () => <Pictogram name={SomeName.bank} />;
    `);
    const importStat: ComponentImportStat = {
      name: 'Pictogram',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['SomeName.bank']);
  });

  it('returns all names when component is used multiple times', () => {
    const sourceFile = createSourceFile(`
      import { SpotIcon } from '@cbhq/cds-illustrations';
      const App = () => (
        <div>
          <SpotIcon name="send" />
          <SpotIcon name="receive" />
        </div>
      );
    `);
    const importStat: ComponentImportStat = {
      name: 'SpotIcon',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['send', 'receive']);
  });

  it('returns empty array when no name prop is present', () => {
    const sourceFile = createSourceFile(`
      import { HeroSquare } from '@cbhq/cds-illustrations';
      const App = () => <HeroSquare size="lg" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'HeroSquare',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual([]);
  });

  it('matches via alias when illustration component is aliased', () => {
    const sourceFile = createSourceFile(`
      import { SpotRectangle as MyRect } from '@cbhq/cds-illustrations';
      const App = () => <MyRect name="banner" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'SpotRectangle',
      alias: 'MyRect',
      importPath: '@cbhq/cds-illustrations',
      version: '4.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['banner']);
  });

  it('works with @coinbase/ scoped illustration packages', () => {
    const sourceFile = createSourceFile(`
      import { HeroSquare } from '@coinbase/cds-web/illustrations';
      const App = () => <HeroSquare name="wallet" dimension="200x200" />;
    `);
    const importStat: ComponentImportStat = {
      name: 'HeroSquare',
      importPath: '@coinbase/cds-web',
      version: '8.0.0',
    };

    expect(getIllustrationNames(importStat, sourceFile)).toEqual(['wallet']);
  });

  describe('real-world: AnnouncementCard with multiple SpotSquare and Pictogram usages', () => {
    // Based on a real Coinbase Card component that uses illustrations in a switch statement
    const announcementCardSource = `
      import { NudgeCard } from '@cbhq/cds-web/cards/NudgeCard';
      import { Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
      import { RemoteImage } from '@cbhq/cds-web/media';

      function AnnouncementCardContent({ cardName, imageUrl }: any) {
        const media = (() => {
          const imageSize = 120;
          switch (cardName) {
            case 'low_balance':
              return <SpotSquare name="cardDeclined" />;
            case 'reward_expiring_soon':
              return <SpotSquare name="rewardExpiring" />;
            case 'reward_expiring':
              return <SpotSquare name="rewardExpiring" />;
            case 'activate_card':
              return <SpotSquare name="cardShipped" />;
            case 'out_of_funds':
              return <Pictogram name="cardDeclined" dimension="64x64" />;
            case 'zero_fees':
              return <SpotSquare name="coinbaseCardSparkle" />;
            case 'direct_deposit':
              return <SpotSquare name="boostedCard" scaleMultiplier={0.8} />;
            default:
              return <RemoteImage width={imageSize} height={imageSize} source={imageUrl} />;
          }
        })();

        return <NudgeCard media={media} title="Test" />;
      }
    `;

    const sourceFile = createSourceFile(announcementCardSource);

    it('extracts all SpotSquare illustration names from switch cases', () => {
      const spotSquareStat: ComponentImportStat = {
        name: 'SpotSquare',
        importPath: '@cbhq/cds-web',
        version: '8.0.0',
      };

      const names = getIllustrationNames(spotSquareStat, sourceFile);
      expect(names).toEqual([
        'cardDeclined',
        'rewardExpiring',
        'rewardExpiring',
        'cardShipped',
        'coinbaseCardSparkle',
        'boostedCard',
      ]);
    });

    it('extracts Pictogram name separately', () => {
      const pictogramStat: ComponentImportStat = {
        name: 'Pictogram',
        importPath: '@cbhq/cds-web',
        version: '8.0.0',
      };

      const names = getIllustrationNames(pictogramStat, sourceFile);
      expect(names).toEqual(['cardDeclined']);
    });

    it('returns empty for non-illustration components in the same file', () => {
      const nudgeCardStat: ComponentImportStat = {
        name: 'NudgeCard',
        importPath: '@cbhq/cds-web',
        version: '8.0.0',
      };

      expect(getIllustrationNames(nudgeCardStat, sourceFile)).toEqual([]);
    });
  });

  describe('real-world: BlockedMessageScreen with dynamic illustration name props', () => {
    // Based on a real onboarding screen that passes illustration names dynamically via type assertions
    const blockedMessageSource = `
      import type { HeroSquareName } from '@cbhq/cds-illustrations';
      import type { SpotRectangleName } from '@cbhq/cds-common';
      import { HeroSquare, SpotRectangle } from '@cbhq/cds-mobile/illustrations';

      function BlockedMessageScreen({
        illustrationType = 'HeroSquare',
        illustrationName = 'bigWarning',
      }: any) {
        const getIllustration = (() => {
          if (illustrationType === 'SpotRectangle') {
            return <SpotRectangle name={illustrationName as SpotRectangleName} />;
          }
          if (illustrationType === 'HeroSquare') {
            return <HeroSquare name={illustrationName as HeroSquareName} dimension="200x200" />;
          }
          return <HeroSquare name="bigWarning" dimension="200x200" />;
        })();

        return <div>{getIllustration}</div>;
      }
    `;

    const sourceFile = createSourceFile(blockedMessageSource);

    it('extracts type-asserted dynamic names and static fallback for HeroSquare', () => {
      const heroSquareStat: ComponentImportStat = {
        name: 'HeroSquare',
        importPath: '@cbhq/cds-mobile',
        version: '8.0.0',
      };

      const names = getIllustrationNames(heroSquareStat, sourceFile);
      // Two usages: one with type assertion, one with static string
      expect(names).toHaveLength(2);
      expect(names).toContain('illustrationName as HeroSquareName');
      expect(names).toContain('bigWarning');
    });

    it('extracts type-asserted dynamic name for SpotRectangle', () => {
      const spotRectStat: ComponentImportStat = {
        name: 'SpotRectangle',
        importPath: '@cbhq/cds-mobile',
        version: '8.0.0',
      };

      const names = getIllustrationNames(spotRectStat, sourceFile);
      expect(names).toEqual(['illustrationName as SpotRectangleName']);
    });
  });

  describe('real-world: files with no illustration components', () => {
    it('returns empty for a CDS mobile layout-only file', () => {
      const sourceFile = createSourceFile(`
        import { VStack } from '@cbhq/cds-mobile/layout';
        import { TextBody, TextHeadline } from '@cbhq/cds-mobile/typography';

        function DebugScreen() {
          return (
            <VStack gap={3}>
              <TextHeadline>Title</TextHeadline>
              <TextBody color="fgMuted">Description</TextBody>
            </VStack>
          );
        }
      `);

      const vstackStat: ComponentImportStat = {
        name: 'VStack',
        importPath: '@cbhq/cds-mobile',
        version: '8.0.0',
      };

      expect(getIllustrationNames(vstackStat, sourceFile)).toEqual([]);
    });

    it('returns empty for Icon component (not an illustration)', () => {
      const sourceFile = createSourceFile(`
        import { Icon } from '@cbhq/cds-web/icons';
        import { Box, HStack } from '@cbhq/cds-web/layout';

        function App() {
          return (
            <HStack gap={1}>
              <Icon name="dot" size="m" color="fgPrimary" active />
              <Icon name="dot" size="m" color="fgPrimary" active />
              <Icon name="dot" size="m" color="fgPrimary" active />
            </HStack>
          );
        }
      `);

      const iconStat: ComponentImportStat = {
        name: 'Icon',
        importPath: '@cbhq/cds-web',
        version: '8.0.0',
      };

      // Icon is not in the illustrationComponents list
      expect(getIllustrationNames(iconStat, sourceFile)).toEqual([]);
    });
  });
});
