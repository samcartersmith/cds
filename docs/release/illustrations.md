## Release Illustrations

1. Run `yarn codegen illustrations`
2. Run both android and iOS and make sure the new illustrations didn't break either build.
3. Verify that the illustrations match what is on go/icon-illo-release-history under the illustrations section
4. You'll then need to deploy the assets in the [static-assets](https://github.cbhq.net/engineering/static-assets) repository. Follow the steps in [How to make an illustration release](https://docs.google.com/document/d/1dp5doJ8EzLpeE1PG8KscBwD-azM54hQRG0JW0HVdDnI/edit#heading=h.ng5jyeh1c16v), which is how we deploy assets to our production CDN.
5. Go back to the `frontend/cds` and cut a PR with the prepared illustrations.
