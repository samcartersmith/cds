# Upload generated CDS docs to Google Drive

Follow these steps when refreshing the CB-GPT knowledge base with the latest docs site content from open source CDS Repository.

Complete these steps **regularly**, whenever content changes are made to the docs site, so the knowledge base stays aligned with the live site.

**Only these four files matter for upload:**

- `web-complete.md`
- `mobile-complete.md`
- `web-directory.md`
- `mobile-directory.md`

They are produced under `apps/docs/dist/llms/slackbot-docs/`.

## 1. Generate the latest files

From the open source CDS **repository root** (with dependencies installed: `yarn install`):

```bash
yarn nx run docs:concatenate-llm-docs
yarn nx run docs:generate-site-directory
```

- **`concatenate-llm-docs`** — writes `web-complete.md` and `mobile-complete.md`.
- **`generate-site-directory`** — writes `web-directory.md` and `mobile-directory.md`.

## 2. Upload to Google Drive

1. Open the target [Google Drive directory](https://drive.google.com/drive/folders/1DFYK1FWjWlXfmTj1sX5Iy2nLbkt7QJN8?usp=drive_link) in the browser.
2. Upload **only** the four files from `apps/docs/dist/llms/slackbot-docs/`:
   - **Drag and drop** into the Drive window, or use **New → File upload**.
3. When **replacing** a previous upload, if Drive asks what to do with files that already exist, choose **Replace** or **Replace existing** (not “Keep both” or similar), so you end up with a single current copy per filename. Otherwise Glean can index stale duplicates.
4. Check the **Data Classification** label on each uploaded file. If any file is labeled something other than **Public**, update it to **Public** (this content mirrors the public CDS docs site).

## 3. After upload

- Glean indexing may lag by a few minutes to hours depending on your org’s connector settings.
- Re-run steps 1–2 whenever you want the bot’s knowledge to match a new docs release or branch.

## Troubleshooting

- **`concatenate-llm-docs` warns that platform paths are missing** — `build-llm-docs` should have run as a dependency; if it still fails, ensure docgen metadata exists (try `yarn nx run docs:build` once).
- **Empty or partial output** — Run from repo root; ensure `apps/docs` docgen metadata exists (a full `yarn nx run docs:build` may be needed if plugin outputs are missing).
