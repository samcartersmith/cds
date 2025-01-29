import TestRenderer from 'react-test-renderer';

import { InputStack, InputStackProps } from '../InputStack';

const TEST_ID = 'input';

function expectAttribute<
  K extends keyof Pick<InputStackProps, 'width' | 'disabled' | 'variant' | 'height'>,
>(prop: K, values: readonly NonNullable<InputStackProps[K]>[]) {
  const input = <input required id="name" name="name" type="text" />;

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
  expectAttribute('width', ['10%', '50%', '100%']);
});

describe('height', () => {
  expectAttribute('height', ['10%', '50%', '100%', 56, 40]);
});

describe('disabled', () => {
  expectAttribute('disabled', [false, true]);
});

describe('variant', () => {
  expectAttribute('variant', ['foreground', 'foregroundMuted', 'negative', 'positive', 'primary']);
});
