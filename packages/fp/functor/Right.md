---
category: fp.functor
---

# Right functor

Corresponding to it is Wrong (aka. Left) functor.

```typescript
class Right<T> {
  private val: T;
  get value():T{
    return this.val;
  }
  static of<T>(val: T):Right<T>;
  map<F extends Func>(fn: F):Right<ReturnType<F>>;
}
```

# Usage

```typescript
import {Right, Wrong} from '@utils-plus/core';
const parseJSON = (msg: string) => {
  try {
    return Right.of(JSON.parse(msg));
  } catch (err) {
    const e = err as Error;
    return Wrong.of(e.message);
  }
};
typeof parseJSON('{"a":"hello-world"}').map((obj)=>{return obj.a;}).value // string
```