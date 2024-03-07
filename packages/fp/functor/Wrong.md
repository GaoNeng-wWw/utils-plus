---
category: fp.functor
---

# Wrong functor

The Wrong functor is also known as the Left functor. Corresponding to it is Right functor.

:::info
To ensure it is a pure function, The map method always return self.
:::

```typescript
class Wrong<T> {
  private val: T;
  get value():T
  static of<T>(val: T):Wrong<T>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<F extends Func>(fn: F):this
}
```

## Usage

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
parseJSON('{a:hello-world}') instanceof Wrong // true
parseJSON('{a:hello-world}').map(()=>{}) instanceof Wrong // true
typeof parseJSON('{"a":"hello-world"}').map((obj)=>{return obj.a;}).value // string
```