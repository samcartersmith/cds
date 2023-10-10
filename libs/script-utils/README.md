# @cbhq/script-utils

Common utils for scripts

## Organization

Each util category has its own subfolder. For example, all string utils live in src/string/\*.ts and then are re-exported in a src/string/index.ts.

### Example

- src/string/split.ts
  - `export function split() { ... }`
- src/string/index.ts
  - ```
    export * from "./split";
    ```

## Usage

In consumers this can pulled in via @cbhq/script-utils deep imports like so:

```
import { split } from "@cbhq/script-utils"

const colorName = 'color/blue/0'
const [prefix, ...rest] =  split(colorName, '/');

```
