---
category: fp.functor
---

# Container functor

Container functor just used wrap value.

:::info
If you not need solve the functor nest question or determine type of functor or process side effect. The container functor can solve most case.
:::

## Methods

```typescript
export class Container<T> {
  get value():T{}
  static of<T>(val: T):Container<T>{}
  map<F extends Func>(f: F): Container<T>{}
}
```

## Usage

```typescript
import {Container} from '@utils-plus/core';
const container = Container.of(1).value // 1
```