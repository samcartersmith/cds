## Release Illustrations

Prior to running release make sure you have done the following. This should be a 1 time setup. You shouldn't need this afterwards:

1. install hub using homebrew (a CLI tool for managing github repo)
2. https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository - Follow these instruction to make sure that you have all the config to make a fork from Coinbase Repo
3. install pngcrush using homebrew (a CLI tool to compress pngs). Run `brew install pngcrush` and `brew install hub`

Now lets release the illustrations:

1. Checkout a branch called `<lastName>/illos-mm-dd-yyyy` with pr title `[trivial] chore(Illustrations): Publish illustrations mm/dd/yyyy`. [Example for titling](https://github.cbhq.net/frontend/cds/pull/1108)

2. Run `yarn nx run codegen:illustrations`. This command will generate another PR to upload illustrations to static-assets. You need to merge that PR in first, so that
   it uploads those assets onto CDN. Then, it will render well on Percy.
3. Scroll up in the output of the script and find the link to the geneated pull request link against https://github.cbhq.net/engineering/static-assets.
4. Follow the link and land the pr against https://github.cbhq.net/engineering/static-assets. When it lands the assets will be uploaded to an s3 bucket that will serve them.
   (Example pr: https://github.cbhq.net/engineering/static-assets/pull/774)
5. Verify that the Percy changes for illustrations matches [go/icon-illo-release-history](https://docs.google.com/document/d/19N5EpYixyttCbmi2pbO0DsC0waL14v77MrwR7OQrwJQ/edit#heading=h.v54y1yynd69b)

Note: After running the upload command, all .png files should be deleted. PNG files should not be commited at all.

It takes about 15 min for the changes landed against https://github.cbhq.net/engineering/static-assets to take affect. If you do not wait percy will be incorrect on our CI because the images will not be available yet.

7. Once it has been 10 minutes come back to the CDS repo (`frontend/cds`) and it is time to land the changes from the script above into the CDS repo. These changes allow our components to reference the assets that we just uploaded to the s3 bucket.

8. Refer to step 1 for proper branch naming.

9. Open a pull request and land the pr.

10. Send Percy link to the Illustrations DRI so that they can approve.
