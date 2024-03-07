---
category: fp
---

# Compose

Execute functions sequentially from right to left

:::tip
Because the function is executed from right to left, the rightmost function can have multiple parameters, but other functions must only have one parameter
:::

## Usage

```typescript
import {compose} from '@utils-plus/core';
compose(
  (x: number) => x * -1.
  (x: number) => x - 1,
)(0) // 2 - 1 * -1
```