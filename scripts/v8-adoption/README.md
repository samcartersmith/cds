V8 Adoption Scanner

This script clones configured repositories, scans source for CDS usage, splits counts into:

- cds: imports from `@cbhq/cds-*` or configured aliases
- v7 cds: same, but the import path includes `/v7`
- other: ignored for the percentage

It outputs an overall `summary.md` with:

- migrationPercent = cds / (cds + v7 cds)
- CDS version from package.json (prefers `@cbhq/cds-common`, else `@cbhq/cds-web`, else `@cbhq/cds-mobile`)

Usage

1. Ensure GitHub SSH access to `github.cbhq.net`.
2. Edit `config.json` to list repos and paths to scan.
3. Run:

```bash
node scripts/v8-adoption/run.mjs
```

Results are written to `scripts/v8-adoption/output/`.

Config format (config.json)

```json
{
  "repos": [
    {
      "id": "retail-mobile",
      "label": "Retail Mobile",
      "github": "consumer/react-native",
      "branch": "master",
      "paths": ["src/packages/app"],
      "dependencyPath": "src/packages/app",
      "cdsAliases": [":rn/cds-wallet"]
    }
  ]
}
```

Notes

- The parser is regex-based and fast; it counts JSX usages from local import bindings and namespace imports. Dynamic patterns or re-exports may not be fully captured.
- Add project-specific aliases via `cdsAliases` to treat custom wrapper packages as CDS.
