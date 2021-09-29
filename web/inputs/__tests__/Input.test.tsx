import TestRenderer from 'react-test-renderer';

import { Input, InputProps } from '../Input';

const TEST_ID = 'input';

function expectAttribute<
  K extends keyof Pick<InputProps, 'width' | 'disabled' | 'variant' | 'height'>,
>(prop: K, values: readonly NonNullable<InputProps[K]>[]) {
  const input = <input type="text" id="name" name="name" required />;

  values.forEach((value) => {
    // eslint-disable-next-line jest/require-top-level-describe
    it(`will set "${value}" for \`${prop}\` prop`, () => {
      const inputRenderer = TestRenderer.create(
        <Input testID={TEST_ID} {...{ [prop]: value }} input={input} />,
      );

      const inputInstance = inputRenderer.root;
      expect(inputInstance.props[prop]).toEqual(value);
    });
  });
}

describe('width', () => {
  expectAttribute('width', ['10%', '50%', '100%']);
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
