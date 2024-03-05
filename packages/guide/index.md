# Get Started

## Install

```bash
pnpm install @utils-plus/core --save-dev
```

## Usage Example

Just import the features you need from `@utils-plus/core`

```typescript
import {curry} from '@utils-plus/core';
const add = curry((a: number, b:number) => a+b);
const res = add(1)(2); // res is 3!
```