---
category: fp.functor
---

# Monad functor

Monad is a structure that combines program fragments (functions) and wraps their return values in a type with additional computation.

## Methods

```typescript
class Monad<T>{
  static of<T>(val: T): Monad<T>{}
  map<F>(fn:F): Monad<ReturnType<F>>{}
  flatmap<F>(fn:F): ReturnType<F>{}
  join():T{}
  get value(): T{}
}
```

## Usage

```typescript
import {Monad} from '@utils-plus/core';
const monad = Monad.of(1).map((x:number) => Monad.of(x+1))
monad.value instanceof Monad // true
const monad2 = Monad.of(1).flatMap((x:number) => Monad.of(x+1))
monad2.value // 2
```