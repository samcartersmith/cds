# CDS Icons

<!-- TODO: How to use -->

<!-- TODO: Shared icon APIs -->

The icons are synchronized with the publish icon component library in [figma](https://www.figma.com/file/ZPu9gtLB5KTkzazHcf9Sfi/CDS-Icons?node-id=1107%3A22364).

To pull icons from figma, run:

```bash
bazel run //eng/shared/design-system:sync_icons
```

To generate icon font and react components for all the icons, run:

```bash
bazel run //eng/shared/design-system:codegen
# format generated icon components
bazel run //eng/shared/design-system:eslint_fix_icons
```
