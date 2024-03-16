import { describe, expect, it } from 'vitest';
import { isEmptyObject } from '../is-empty';

describe('is Empty', () => {
  it('not object', () => {
    expect(()=>isEmptyObject(123 as any)).toThrow();
    expect(()=>isEmptyObject('' as any)).toThrow();
    expect(()=>isEmptyObject(true as any)).toThrow();
    expect(()=>isEmptyObject(false as any)).toThrow();
    expect(()=>isEmptyObject(()=>{})).toThrow();
  });
  it('object', ()=>{
    expect(isEmptyObject({})).toBeTruthy();
    expect(isEmptyObject({a:1})).toBeFalsy();
    const obj = Object.defineProperty({}, 'a', {
      enumerable: false,
      configurable: false,
      value: 1
    });
    expect(isEmptyObject(obj, true)).toBeFalsy();
    expect(isEmptyObject(obj)).toBeTruthy();
  });
});