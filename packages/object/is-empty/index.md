---
category: object
---

# IsEmptyObject

Check if the object is empty

:::tip
Function will used JSON.stringify. But if enable strict, function will get all properties (including non-enumerable properties except for those which use Symbol)
:::

## Usage

```typescript
import {IsEmptyObject} from '@utils-plus/core';
IsEmptyObject({}) // true
IsEmptyObject({a:1}) // false
const obj = Object.defineProperty({a:1}, 'a', {
  enumerable: false,
});
IsEmptyObject(obj) // true
IsEmptyObject(obj, true) // false
```