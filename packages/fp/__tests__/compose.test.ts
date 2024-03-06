import { describe, expect, it, vi } from 'vitest';
import { compose } from '../compose';

describe('compose', ()=>{
  it('single param', ()=>{
    const fns = [
      vi.fn((x:number) => {
        return x+1;
      }),
      vi.fn((x:number) => {
        return x * -1;
      }),
    ];
    const f = compose(...fns);
    expect(f(1)).toBe(0);
  });
  it('mutil param', ()=>{
    const fns = [
      vi.fn((x:number) => {
        return x+1;
      }),
      vi.fn((x:number, y: number) => {
        return (x*y)*-1;
      }),
    ];
    const f = compose(...fns);
    expect(f(1, 2)).toBe(-1);
  });
  it('rest', ()=>{
    const fns = [
      vi.fn((...args: number[]) => {
        return args.reduce((pre, cur) => pre + cur) + 1;
      }),
      vi.fn((...args: number[]) => {
        return args.reduce((pre, cur) => pre+cur) * -1;
      }),
    ];
    const f = compose(...fns);
    expect(f(1, 2)).toBe(-2);
  });
});