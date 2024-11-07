# Opening your First Pull Request

We use `yarn mono-pipeline` to version our work in our packages. Prior to pushing up a PR:

1. Commit all of your work. This step is important because mono-pipeline will only validate committed work for their scripts.
2. Run `yarn mono-pipeline validate-versioned` in root. Follow the prompts from `mono-pipeline` to update each impacted package. Once this passes, continue to step 3.
3. Run `yarn release`. This will update all Changelogs and package.json files to conform to our best practices.

# Helpful Aliases

To make your life easier, add these aliases to your `.alias.zsh`:

```
# Validate CDS package versions and bump changed package(s)
alias bumpcds="yarn mono-pipeline validate-versioned"

# Handy commit message alias
# eg: gct:feat '<YOUR_MESSAGE>'
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
