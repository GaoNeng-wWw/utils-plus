---
category: fp
---

# Pipe

# Compose

Execute functions sequentially from left to right

:::tip
Because the function is executed from left to right, the leftmost function can have multiple parameters, but other functions must only have one parameter
:::

## Usage

```typescript
import {pipe} from '@utils-plus/core';
pipe(
  (x: number) => x * -1.
  (x: number) => x - 1,
)(0) // 2 - 1 * -1
```