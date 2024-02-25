import { describe, expect, it } from 'vitest';
import pipe from '../src/pipe';

describe('pipe', ()=>{
  it('single param', ()=>{
    const f = pipe([
      (x: number) => {return x+1;},
      (x: number) => {return x+1;},
      (x: number) => {return x+1;}
    ]);
    expect(f(1)).toBe(4);
  });
  it('mutil param', ()=>{
    const f = pipe([
      (x: number, y: number) => {return x+y;},
      (x:number) => {return x**2;}
    ]);
    expect(f(1, 2)).toBe((1+2)**2);
  });
  it('rest param', ()=>{
    const f = pipe([
      (...args: number[]) => args.reduce((pre, cur) => pre+cur),
      (x:number) => x**2
    ]);
    expect(f(1, 2, 3, 4, 5)).toBe(
      [1, 2, 3, 4, 5].reduce((pre, cur) => pre+cur) ** 2
    );
  });
});