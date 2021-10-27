/* eslint-disable react-native/no-raw-text */
import { entries } from '@cbhq/cds-utils';
import { render, waitFor } from '@testing-library/react-native';
import { Animated, Text } from 'react-native';

import { TextProps } from '../createText';
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

const Type = {
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
};

const textTestRunner = (testFn: (type: React.ComponentType<TextProps>) => void) => {
  entries<typeof Type>(Type).map(async ([, TextComponent]) => testFn(TextComponent));
};

describe('Text', () => {
  it('renders text', () => {
    textTestRunner((TextComponent) => {
      const result = render(<TextComponent>Text</TextComponent>);

      expect(result.UNSAFE_queryAllByType(Text)).toHaveLength(1);
      expect(result.getByText('Text')).toBeTruthy();
    });
  });

  it('renders an Animated.Text when animated={true}', () => {
    textTestRunner((TextComponent) => {
      const result = render(<TextComponent animated>Text</TextComponent>);

      expect(result.UNSAFE_queryAllByType(Animated.Text)).toHaveLength(1);
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can show tabular numbers`, async () => {
      const { getByText } = render(<TextComponent tabularNumbers>Text</TextComponent>);

      await waitFor(() => getByText('Text'));

      expect(getByText('Text')).toHaveStyle({
        fontVariant: ['tabular-nums'],
      });
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can show underline`, async () => {
      const { getByText } = render(<TextComponent underline>Text</TextComponent>);

      await waitFor(() => getByText('Text'));

      expect(getByText('Text')).toHaveStyle({
        textDecorationLine: 'underline',
      });
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can be styled to not wrap`, async () => {
      const { getByText } = render(<TextComponent noWrap>Text</TextComponent>);
      await waitFor(() => getByText('Text'));

      expect(getByText('Text').props).toHaveProperty('numberOfLines', 1);
    });
  });
});
