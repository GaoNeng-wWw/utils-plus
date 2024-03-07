---
category: fp.functor
---

# IO functor

IO functor can "control" side-effect.

```typescript
class IO<
  F extends () => R,
  R = ReturnType<F>
> {
  private val: F;
  static of<T>(val: T):IO<() => T, T>;
  map<T extends unknown[], U>(f: (...args: T) => U):IO<<U>(...args: U) => U, U>
  get value():T
}
```

## Usage

```typescript
import {IO} from '@utils-plus/core';
IO.of(1).map((x:number) => x+1).value
```

