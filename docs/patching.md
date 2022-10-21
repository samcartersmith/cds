# Patching Internal Packages

Run `yarn patch [package-name]` and follow the instructions:

```bash
$ yarn patch [package-name]

➤ YN0000: Package [package-name]@npm:2.8.0 got extracted with success!
➤ YN0000: You can now edit the following folder: /private/var/folders/d2/__gbqwzs0yz5bhwmy8c9ctj00000gp/T/xfs-0701f47e/user
➤ YN0000: Once you are done run yarn patch-commit -s /private/var/folders/d2/__gbqwzs0yz5bhwmy8c9ctj00000gp/T/xfs-0701f47e/user and Yarn will store a patchfile based on your changes.
➤ YN0000: Done in 0s 100ms
```

Update the changelog to denote the breaking change that required a patch. See [Example](https://github.cbhq.net/frontend/cds/pull/1256).
