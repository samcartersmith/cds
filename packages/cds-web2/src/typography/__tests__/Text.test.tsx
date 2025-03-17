import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { DefaultThemeProvider } from '../../utils/test';
import {
  type TextDefaultElement,
  type TextProps,
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextLegal,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
} from '../index';

const textComponents = [
  TextDisplay1,
  TextDisplay2,
  TextDisplay3,
  TextTitle1,
  TextTitle2,
  TextTitle3,
  TextTitle4,
  TextHeadline,
  TextBody,
  TextLabel1,
  TextLabel2,
  TextCaption,
  TextLegal,
] as const;

const textTestRunner = (
  testFn: (type: React.ComponentType<TextProps<TextDefaultElement>>) => void,
) => {
  textComponents.forEach(async (TextComponent) => {
    testFn(TextComponent);
  });
};

describe('Text', () => {
  textTestRunner((TextComponent) =>
    it(`${TextComponent.name} passes accessibility`, async () => {
      expect(await renderA11y(<TextComponent>Child</TextComponent>)).toHaveNoViolations();
    }),
  );

  it('can show tabular numbers', () =>
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent tabularNumbers testID={`text-${TextComponent.name}`}>
            20.21
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.name}`).className).toContain(
        'tabularNumbers',
      );
    }));

  it('can show slashed Zero', () =>
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent slashedZero testID={`text-${TextComponent.name}`}>
            YO2021Coinbase
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.name}`).className).toContain('slashedZero');
    }));

  it('can be styled to not wrap', () =>
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent noWrap testID={`text-${TextComponent.name}`}>
            No Wrap
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.name}`).className).toContain('noWrap');
    }));

  it('renders empty content when renderEmptyNode is true', () => {
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode testID={`text-${TextComponent.name}`}>
            {null}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`text-${TextComponent.name}`)).toBeEmptyDOMElement();
    });
  });

  it('does not render when renderEmptyNode is false and content is empty', () => {
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`text-${TextComponent.name}`}>
            {undefined}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId(`text-${TextComponent.name}`)).not.toBeInTheDocument();
    });
  });

  it('handles different empty values when renderEmptyNode is false', () => {
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.name}-null-text`}>
            {null}
          </TextComponent>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.name}-undefined-text`}>
            {undefined}
          </TextComponent>
          <TextComponent
            renderEmptyNode={false}
            testID={`${TextComponent.name}-empty-string-text`}
          />
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.name}-nan-text`}>
            {NaN}
          </TextComponent>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.name}-number-content`}>
            {0}
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId(`${TextComponent.name}-null-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.name}-undefined-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.name}-empty-string-text`)).toBeNull();
      expect(screen.queryByTestId(`${TextComponent.name}-nan-text`)).toBeNull();
      expect(screen.getByTestId(`${TextComponent.name}-number-content`)).toBeInTheDocument();
      expect(screen.getByTestId(`${TextComponent.name}-number-content`)).toHaveTextContent('0');
    });
  });

  it('renders content when renderEmptyNode is false and content exists', () => {
    textTestRunner((TextComponent) => {
      render(
        <DefaultThemeProvider>
          <TextComponent renderEmptyNode={false} testID={`${TextComponent.name}-text`}>
            Hello World
          </TextComponent>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId(`${TextComponent.name}-text`)).toBeInTheDocument();
      expect(screen.getByTestId(`${TextComponent.name}-text`)).toHaveTextContent('Hello World');
    });
  });
});
