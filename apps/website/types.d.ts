/* 
  You can embed MDX documents in other documents. 
  This is also known as transclusion.
  You can achieve this by importing an .mdx (or .md) file.
  https://mdxjs.com/getting-started#documents
  https://mdxjs.com/advanced/typescript
*/
declare module '*.mdx' {
  export default MDXComponent as React.FC;
}

type ThemeToggleProps = {
  showFrontier?: boolean;
  hideDense?: boolean;
};

type ExampleWithThemeTogglesProps = ThemeToggleProps & {
  children?: React.ReactNode;
};

declare module '@theme/CdsProviders' {
  export default function CdsProviders(props: { children?: React.ReactNode }): JSX.Element;
}

declare module '@theme/ThemeToggles' {
  export default function ThemeToggles(props: ThemeToggleProps): JSX.Element;
}

declare module '@theme/ExampleWithThemeToggles' {
  export default function ExampleWithThemeToggles(props: ExampleWithThemeTogglesProps): JSX.Element;
}
