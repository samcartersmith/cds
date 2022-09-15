# Opening your First Pull Request

To ensure the changelog is correctly generated and packages are correctly versioned and released, you must ensure your commit messages follow convention. If your PR has multiple commits, you will need to format your _squash_ commit message the following way:

```
# Without a jira ticket
[trivial] {logType}: {message}

# With one or many jira tickets
[CDS-xxx] {logType}: {message}
```

With `logType` being one of the following:

- breaking - major version bump
- feat, change, new, update - minor version bump
- fix, patch, chore, types - patch version bump
- release, internal, docs, tests - no-op

To make your life easier, add these aliases to your `.alias.zsh`:

```
# git commit trivial aliases
gct() {
  git commit -m "[trivial] $1: $2"
}

# Major version bump
alias gct:breaking='gct breaking $2'
# Minor version bump
alias gct:feat='gct feat $2'
alias gct:change='gct change $2'
alias gct:new='gct new $2'
alias gct:update='gct update $2'
# Patch version bump
alias gct:fix='gct fix $2'
alias gct:patch='gct patch $2'
alias gct:chore='gct chore $2'
alias gct:types='gct types $2'
# No-op
alias gct:release='gct release $2'
alias gct:internal='gct internal $2'
alias gct:docs='gct docs $2'
alias gct:tests='gct tests $2'
```

More info: [packages/codegen/releasePackages.ts](https://github.cbhq.net/frontend/cds/blob/master/packages/codegen/releasePackages.ts)
