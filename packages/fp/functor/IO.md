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
const data = ['item-1', 'item-2'];
const getDataById = (id: number) => data[id];
const uppercase = (x:string) => x.toUpperCase();
const io = IO.of(getDataById(0)).map(uppercase);
expect(io.value).toBe('ITEM-1');
data[0]='item-2';
expect(io.value).toBe('ITEM-1');
```

