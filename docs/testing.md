# Testing

When you build anything at CDS, you should at least create 1 test case for each item you build. This section will describe how you can test your new feature.

## **Running Test Cases**

**Test Mobile**: To run tests on mobile, run the command `yarn nx run mobile:test`.

**Test Web**: To run tests on web, run the command `yarn nx run web:test`.

**Both**: You can run all tests by running the command `yarn nx affected --target=test`

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

## **Testing Locally on external projects**

1. Build your project and any dependencies of that project with `yarn nx run affected --target=build`.
2. The output of the packages above will be in `.nx/dist/packages` or `packages/<package name>/lib`. This output path varies depending on setup. The package.json > main field should show where the transpiled files are output to. For example, `cds-mobile` would be in `.nx/dist/packages/mobile`
3. Copy the absolute path to your package
4. In the external project add to dependencies and resolution portion of package.json to guarantee everything is pulling from your local packages:

```
  "@cbhq/cds-common": "file:/absolute path to this/.nx/dist/packages/common",
  "@cbhq/cds-fonts": "file:/absolute path to this/.nx/dist/packages/fonts"
  "@cbhq/cds-lottie-files": "file:/absolute path to this/.nx/dist/packages/lottie-files",
  "@cbhq/cds-mobile": "file:/absolute path to this/.nx/dist/packages/mobile"
  "@cbhq/cds-utils": "file:/absolute path to this/.nx/dist/packages/utils"
  "@cbhq/cds-web": "file:/absolute path to this/.nx/dist/packages/web"
```

5. Run `yarn install` on the external project
6. If you update the package in the cds repo and want to sync it in the external project then you will have to run `yarn upgrade [dependency]`. For example `yarn upgrade @cbhq/cds-common`

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

# **Troubleshooting**

### **Having issues testing locally on external project**

If you find that the output in `.nx/dist/packages/<package>` is not what you expect. Its possible that there were changes made to one of the scripts in `tools/executors`. Try running `yarn install`.

**Explanation** <br/>
By running `yarn install`, it will trigger the `setup.sh` script to get executed during post-install. This will ensure that you are running the latest executor script.
