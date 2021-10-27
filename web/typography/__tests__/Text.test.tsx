import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { DynamicElement } from '../../types';
import { HTMLNonHeadingTextTags, HTMLTextTags, TextProps } from '../TextProps';
import {
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

type TextComponent =
  | React.ComponentType<DynamicElement<TextProps, HTMLTextTags, true>>
  | React.ComponentType<DynamicElement<TextProps, HTMLNonHeadingTextTags, true>>;

const textTestRunner = (testFn: (type: TextComponent) => void) => {
  textComponents.map(async (TextComponent) => testFn(TextComponent));
};

function expectClassName<K extends keyof TextProps>(
  TextComponent: TextComponent,
  prop: K,
  values: NonNullable<TextProps[K]>[],
  otherClasses?: string,
) {
  values.forEach((value) => {
    // eslint-disable-next-line jest/require-top-level-describe
    it(`${TextComponent.displayName} will set "${value}" class name for \`${prop}\` prop`, () => {
      const { container } = render(
        <TextComponent as="p" {...{ [prop]: value }}>
          Child
        </TextComponent>,
      );
      expect(container.firstChild).toHaveClass(
        otherClasses ? `${otherClasses} ${value}` : String(value),
      );
    });
  });
}

describe('Text', () => {
  textTestRunner((TextComponent) =>
    it(`${TextComponent.displayName} passes accessibility`, async () => {
      expect(await renderA11y(<TextComponent as="span">Child</TextComponent>)).toHaveNoViolations();
    }),
  );

  textTestRunner((TextComponent) =>
    (
      [
        'p',
        'span',
        'label',
        'time',
        'output',
        'code',
        'pre',
        's',
        'abbr',
        'q',
        'kbd',
        'del',
        'ins',
        'sup',
        'sub',
        'li',
      ] as const
    ).forEach((tag) => {
      it(`${TextComponent.displayName} can render as a "${tag}" element using the \`as\` prop`, () => {
        const { container } = render(<TextComponent as={tag}>Child</TextComponent>);

        expect(container.querySelectorAll(tag)).toHaveLength(1);
      });
    }),
  );

  it('can show tabular numbers', () => {
    textTestRunner((TextComponent) => {
      const { container } = render(
        <TextComponent as="p" tabularNumbers>
          20.21
        </TextComponent>,
      );

      expect(container.firstChild).toHaveClass('tabularNumbers');
    });
  });

  it('can show slashed Zero', () => {
    textTestRunner((TextComponent) => {
      const { container } = render(
        <TextComponent as="p" slashedZero>
          YO2021Coinbase
        </TextComponent>,
      );

      expect(container.firstChild).toHaveClass('slashedZero');
    });
  });

  it('can show underline', () => {
    textTestRunner((TextComponent) => {
      const { container } = render(
        <TextComponent as="p" underline>
          Underline
        </TextComponent>,
      );

      expect(container.firstChild).toHaveClass('underline');
    });
  });

  it('can be styled to not wrap', () => {
    textTestRunner((TextComponent) => {
      const { container } = render(
        <TextComponent as="p" noWrap>
          No Wrap
        </TextComponent>,
      );

      expect(container.firstChild).toHaveClass('noWrap');
    });
  });
  describe('overflow', () => {
    textTestRunner((TextComponent) => {
      expectClassName(TextComponent, 'overflow', ['truncate', 'clip']);
    });
  });

  describe('selectable', () => {
    textTestRunner((TextComponent) => {
      expectClassName(TextComponent, 'selectable', ['none', 'text', 'all']);
    });
  });

  describe('transform', () => {
    textTestRunner((TextComponent) => {
      expectClassName(TextComponent, 'transform', ['uppercase', 'lowercase', 'capitalize']);
    });
  });
});
