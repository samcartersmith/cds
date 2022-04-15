# Testing

When you build anything at CDS, you should at least create 1 test case for each item you build. This section will describe how you can test your new feature.

## **Running Test Cases**

**Test Mobile**: To run tests on mobile, run the command `yarn mobile test`.

**Test Web**: To run tests on web, run the command `yarn web test`.

**Both**: You can run all tests by running the command `yarn test`

By default, these commands will run every test that exist. You can configure it such that it only run tests that you care about.

## **Testing Locally on external projects**

- Build your project and any dependencies of that project with `yarn run build`.
- The output of the packages above will be in `.nx/dist/packages`. For example, `cds-mobile` would be in `.nx/dist/packages/mobile`
- Copy the absolute path to your package
- In the external project add to dependencies and resolution portion of package.json to guarantee everything is pulling from your local packages:

```
  "@cbhq/cds-common": "file:/absolute path to this/.nx/dist/packages/common",
  "@cbhq/cds-fonts": "file:/absolute path to this/.nx/dist/packages/fonts"
  "@cbhq/cds-lottie-files": "file:/absolute path to this/.nx/dist/packages/lottie-files",
  "@cbhq/cds-mobile": "file:/absolute path to this/.nx/dist/packages/mobile"
  "@cbhq/cds-utils": "file:/absolute path to this/.nx/dist/packages/utils"
  "@cbhq/cds-web": "file:/absolute path to this/.nx/dist/packages/web"
```

- Run `yarn install` on the external project
- If you update the package in the cds repo and want to sync it in the external project then you will have to run `yarn upgrade [dependency]`. For example `yarn upgrade @cbhq/cds-common`

# **Troubleshooting**

### **Having issues testing locally on external project**

If you find that the output in `.nx/dist/packages/<package>` is not what you expect. Its possible that there were changes made to one of the scripts in `tools/executors`. Try running `yarn install`.

**Explanation** <br/>
By running `yarn install`, it will trigger the `setup.sh` script to get executed during post-install. This will ensure that you are running the latest executor script.