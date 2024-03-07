---
category: fp.functor
---

# Maybe functor

Before using maybe.map, the function will check if value is falsely, and if so, it will return a maybe functor with a null value.

```typescript
class Maybe<T>{
  private val: T;
  get value():T
  static of<T>(val: T):Maybe<T>
  map<F extends Func>(f: F): Maybe<ReturnType<F>>|Maybe<null>;
}

```

## Usage

```typescript
import {Maybe} from '@utils-plus/core';
Maybe.of(1).map((x) => null).map((x)=>x).map((x) => x+1).value // null
```