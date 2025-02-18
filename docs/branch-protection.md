# Branch Protection

To deploy a git branch via Codeflow, the branch must be protected via Heimdall.

### Adding new branches to Heimdall branch protection for Codeflow deployments:

1. Create a new branch from master that will eventually be deployed
   `git checkout master && git checkout -b 8.0.0-alpha`
2. Push your new branch to the origin
   `git push origin 8.0.0-alpha`
3. Create another new branch from master to update .codeflow.yml
   `git checkout master && git checkout -b cody/branch-protection`
4. Add the new branch name from step 1 to .codeflow.yml `secure` `branches`
5. PR the codeflow settings update to master
6. Once the PR is merged, checkout master and pull down the updates
   `git checkout master && git pull origin master`
7. Checkout the branch from step 1 and rebase it with master
   `git checkout 8.0.0-alpha && git rebase master`
8. Push the branch from step 1 to origin using force-with-lease
   `git push origin 8.0.0-alpha --force-with-lease`

You now have a properly protected `8.0.0-alpha` branch that can be deployed via Codeflow
