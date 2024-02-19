# @utils-plus/fp

functional utils

## Quick Start

```bash
npm install @utils-plus/fp --save
```

```typescript
import {curry} from '@utils-plus/fp';
const f = curry((a:number,b:number) => a+b);
const ans = f(1)(2);
console.log(ans) // 3
```