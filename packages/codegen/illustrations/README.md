# Illustration Release Process 

> Illustrations are released bi-weekly on Wednesday at 1:00pm EST. Icon will release one week, and illustration on the next. They will not be released on the same week.  

## Release Timeline 

Designers should publish their illustrations no later than *1pm PST (4pm EST) on Tuesday*. This gives engineers 1 day to publish. 

Engineers should have their PR merged *no later than 10:30am PST on Wednesday*, since it takes time to deploy to Verdaccio and website. 

**Account for the following factors** 
* It takes at least 1 hrs for PR to be approved
* It takes at least 2 hrs for the release to take effect 

## Self Serve Model (if urgent or CDS engineer is unavailable)

> Depending on what action you want to perform on the illustration - **update**, **delete**, **add**, you will have to do some preprocessing before running the make command. PLEASE READ THIS CAREFULLY 

**How to handle updated Illustration?**
Add the name of illustration + spectrum separated by a dash (i.e noGrayNotifications-dark, noGrayNotifications-light) to the modified.ts list in [`eng/shared/design-system/codegen/illustrations/modified.ts`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/codegen/illustrations/modified.ts)

**How to handle deleted Illustrations?** 
Delete illustration from [`eng/shared/design-system/mobile/illustrations/images`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/mobile/illustrations/images). Make sure to delete the right spectrum or both spectrum. You must also delete the entries from `illustration_manifest.ts`.  

Light illustrations directory - [`eng/shared/design-system/mobile/illustrations/images/light`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/mobile/illustrations/images/light)

Dark illustrations directory - [`eng/shared/design-system/mobile/illustrations/images/dark`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/mobile/illustrations/images/dark)

**How to handle added Illustrations?** 
No actions necessary. Just proceed with step 1 

**Here are the steps:**

1. cd into cds directory [eng/shared/design-system](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/) , and run - `make prepare.illustration`

2. Double check that Percy and [Illustration/Icon Release History](https://docs.google.com/document/d/19N5EpYixyttCbmi2pbO0DsC0waL14v77MrwR7OQrwJQ) match. This ensures that assets obtained are the same on Figma. 
	
3. Upload assets to static-assets. cd into [`codegen/illustrations`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/codegen/illustrations/) from root of cds folder ([`eng/shared/design-system`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/)). Run `./uploadToStaticAssets.sh -b <branch-name> -r <root-dir-name> -u <username>` 

For more information about these parameters, read the comments from 
[`codegen/illustrations/uploadToStaticAssets.sh`](https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system/codegen/illustrations/uploadToStaticAssets.sh). 

You should have 2 PRs by now - one from static-asset, and one from monorepo. Tag a CDS engineer in both PRs so that they are notified. Here are 2 example PRs - 
[Monorepo Illustration Release PR](https://github.cbhq.net/mono/repo/pull/31434), [static-asset Illustration Release PR](https://github.cbhq.net/engineering/static-assets/pull/598) 

> NOTE: static-asset PR must merged before the illustration 
PR. Rebase on the monorepo PR is required so that Percy gets the updated URL.  

4. Run `make release`  - again tag a CDS Engineer once you create the PR 

5. If the verdaccio does not update on a timely manner, you will have to manually bump version. 

6. Once merged, check website to ensure that illustrations are added