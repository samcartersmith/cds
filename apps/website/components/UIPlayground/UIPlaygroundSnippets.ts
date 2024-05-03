const DefaultSnippet = `
function TestComponent() {
  return (
    <Box>
      <TextBody as="p">You can edit this in the live editor or select a preset from the Select.</TextBody>
    </Box>
  );
}`;

const ThemeProviderSnippet = `
function TestComponent() {
  return (
    <ThemeProvider
    palette={{
      foreground: 'gray100',
      foregroundMuted: 'gray60',
      background: 'gray0',
      backgroundAlternate: 'gray5',
      backgroundOverlay: ['gray80', 0.33],
      line: ['gray60', 0.2],
      lineHeavy: ['gray60', 0.68],
      primary: 'blue60',
      primaryForeground: 'gray0',
      negative: 'red60',
      negativeForeground: 'gray0',
      positive: 'green60',
      positiveForeground: 'gray0',
      secondary: 'gray0',
      secondaryForeground: 'gray100',
    }}
  >
    <div>
      <Box background="primary">
        <TextDisplay2 as="h2" color="primaryForeground">
          Primary set to blue60
        </TextDisplay2>
      </Box>
      <ThemeProvider palette={{ primary: 'pink60' }}>
        <Box background="primary">
          <TextDisplay2 as="h2" color="primaryForeground">
            Primary set to pink60
          </TextDisplay2>
        </Box>
      </ThemeProvider>
    </div>
  </ThemeProvider>
  );
}`;

const OverrideNavIcon = `
function TestComponent() {
    return (
      <ThemeProvider
      palette={{
        foreground: 'red60',
        primary: 'blue60',
      }}
    >
      <NavigationIcon name="tag" active/>
      <NavigationIcon name="tag"/>
      test
      </ThemeProvider>
    );
  }`;

type PlayGroundOptionTypes = {
  label: string;
  snippet: string;
  docs: string[];
};

export const playgroundOptions: PlayGroundOptionTypes[] = [
  { label: 'Default', snippet: DefaultSnippet, docs: [] },
  { label: 'ThemeProvider', snippet: ThemeProviderSnippet, docs: ['components/theme-provider'] },
  {
    label: 'OverrideNavIconColor',
    snippet: OverrideNavIcon,
    docs: ['components/theme-provider', 'components/navigation-icon'],
  },
];
