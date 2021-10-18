import TestRenderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react-native';

import { TextInput as RNTextInput } from 'react-native';
import { InputStack, InputStackProps } from '../InputStack';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'input';

function expectAttribute<
  K extends keyof Pick<InputStackProps, 'width' | 'disabled' | 'variant' | 'height'>,
>(prop: K, values: readonly NonNullable<InputStackProps[K]>[]) {
  const input = <RNTextInput value="15" />;

  values.forEach((value) => {
    // eslint-disable-next-line jest/require-top-level-describe
    it(`will set "${value}" for \`${prop}\` prop`, () => {
      const inputRenderer = TestRenderer.create(
        <InputStack testID={TEST_ID} {...{ [prop]: value }} inputNode={input} />,
      );

      const inputInstance = inputRenderer.root;
      expect(inputInstance.props[prop]).toEqual(value);
    });
  });
}

describe('width', () => {
  expectAttribute('width', [10, 50, 100]);
});

describe('height', () => {
  expectAttribute('height', ['10%', '50%', '100%']);
});

describe('disabled', () => {
  expectAttribute('disabled', [false, true]);
});

describe('variant', () => {
  expectAttribute('variant', ['foreground', 'foregroundMuted', 'negative', 'positive', 'primary']);
});

describe('styles', () => {
  it('renders a custom borderStyle', async () => {
    const borderStyle = {
      borderRadius: 8,
      borderWidth: 1,
    };

    const { getByTestId } = render(
      <InputStack testID={TEST_ID} borderStyle={borderStyle} inputNode={<NativeInput />} />,
    );

    await waitFor(() => getByTestId('input-area'));

    expect(getByTestId('input-area')).toHaveStyle(borderStyle);
  });
});
