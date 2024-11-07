# Testing

When you build anything at CDS, you should at least create 1 test case for each item you build. This section will describe how you can test your new feature.

## **Running Test Cases**

**Test Mobile**: To run tests on mobile, run the command `yarn nx run mobile:test`.

**Test Web**: To run tests on web, run the command `yarn nx run web:test`.

**Both**: You can run all tests by running the command `yarn nx run-many --target=test --all`

## Test individual file(s)

By default, these commands will run every test that exist. You can configure it such that it only run tests that you care with the following syntax.

```
yarn nx run web:test --file <file name>
```

Example

```
yarn nx run web:test --file packages/web/layout/__tests__/Box.test.tsx
```

## Watch mode

To run test in watch mode you can add `--watch` args

Example

```
yarn nx run web:test --file packages/web/layout/__tests__/Box.test.tsx --watch
```

## **Testing animations(mobile)**

Mobile animation test is powered by Reanimated jest utils. Check the [official doc](https://docs.swmansion.com/react-native-reanimated/docs/guide/testing) for more info. Follow the guide below for testing Reanimated animation styles and advancing timers.

```jsx
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('has correct animated styles', () => {
  render(<Component />);

  const view = screen.getByTestId('view');
  const style = { opacity: 0 };

  // default style
  expect(view).toHaveAnimatedStyle(style);

  act(() => {
    // duration of the animation
    jest.advanceTimersByTime(200);

    style.opacity = 1;
    // style after animation
    expect(view).toHaveAnimatedStyle(style);
  });
});
```
