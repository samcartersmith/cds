# Opening your First Pull Request

We use `yarn mono-pipeline` to version our work in our packages. Prior to pushing up a PR:

1. Commit all of your work. This step is important because mono-pipeline will only validate committed work for their scripts.
2. Run `yarn mono-pipeline validate-versioned --projectsWithNoSrcFolder='web,mobile,common` in root. Follow the prompts from `mono-pipeline` to update each impacted package. Once this passes, continue to step 3.
3. Run `yarn release`. This will update all Changelogs and package.json files to conform to our best practices.
