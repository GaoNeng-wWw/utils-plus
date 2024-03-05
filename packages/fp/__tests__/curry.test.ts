import {curry} from '../curry';
import {expect, it} from 'vitest';
it('curry', ()=>{
  const add = curry((a:number, b:number) => {return a+b;});
  expect(add(1, 1)).toBe(2);
});