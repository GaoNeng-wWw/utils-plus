---
category: fp
---

# Curry

Transform a function that accepts multiple parameters into a function that accepts a single parameter (the first parameter of the original function), and return a new function that accepts the remaining parameters and returns the result

:::tip
The function will automatically derive the type, but we still recommend that you explicitly declare the type for the parameter
:::

## Usage

```typescript
import {curry} from '@utils-plus/core';
const f = curry((a:number, b:number)=>a+b);
f(1)(2) // 3
f(1,2) //3
```