/* eslint-disable react-native/no-raw-text */
import { Animated, StyleSheet, Text, TextStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { entries } from '@cbhq/cds-utils';

import { TextProps } from '../createText';
import {
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

const textTestRunner = (
  testFn: (type: React.ComponentType<React.PropsWithChildren<TextProps>>) => void,
) => {
  entries<Record<string, React.FC<TextProps>>>(Type).map(async ([, TextComponent]) =>
    testFn(TextComponent),
  );
};

describe('Text', () => {
  it('renders text and passes a11y', () => {
    textTestRunner((TextComponent) => {
      render(<TextComponent testID="mock-text">Text</TextComponent>);

      expect(screen.UNSAFE_queryAllByType(Text)).toHaveLength(1);
      expect(screen.getByText('Text')).toBeTruthy();
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });

  it('renders an Animated.Text when animated={true}', () => {
    textTestRunner((TextComponent) => {
      render(
        <TextComponent animated testID="mock-text">
          Text
        </TextComponent>,
      );

      expect(screen.UNSAFE_queryAllByType(Animated.Text)).toHaveLength(1);
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can show tabular numbers`, async () => {
      render(
        <TextComponent tabularNumbers testID="mock-text">
          Text
        </TextComponent>,
      );

      await screen.findByText('Text');

      expect(screen.getByText('Text')).toHaveStyle({
        fontVariant: ['tabular-nums'],
      });
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can show underline`, async () => {
      render(
        <TextComponent underline testID="mock-text">
          Text
        </TextComponent>,
      );

      await screen.findByText('Text');

      expect(screen.getByText('Text')).toHaveStyle({
        textDecorationLine: 'underline',
      });
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} can be styled to not wrap`, async () => {
      render(
        <TextComponent noWrap testID="mock-text">
          Text
        </TextComponent>,
      );
      await screen.findByText('Text');

      expect(screen.getByText('Text').props).toHaveProperty('numberOfLines', 1);
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });

  textTestRunner((TextComponent) => {
    it(`${TextComponent.displayName} renders mono font`, async () => {
      render(
        <TextComponent mono testID="mock-text">
          Text
        </TextComponent>,
      );
      await screen.findByText('Text');

      // StyleSheet.flatten will Flattens an array of style objects, into one aggregated style object.
      const styles = StyleSheet.flatten(screen.getByText('Text').props?.style as TextStyle);
      expect(styles.fontFamily).toContain('CoinbaseMono');
      expect(screen.getByTestId('mock-text')).toBeAccessible();
    });
  });
});
