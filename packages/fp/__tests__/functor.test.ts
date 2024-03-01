import { expect, it } from 'vitest';
import { Container, IO, Maybe, Right, Wrong } from '../src/functor';

it('IO', ()=>{
  expect(IO.of(1).map((x:number) => x+1).value).toBe(2);
  expect(IO.of(1).map((x:number) => x+1).map((x:number) => x+1).map((x:number) => x+1).value).toBe(4);
});

it('Container', ()=>{
  expect(Container.of(1).map((x:number)=>x+1).map((x)=>x+1).val).toBe(3);
});

it('Maybe', ()=>{
  expect(Maybe.of(1).map(()=>null).map((x: number)=>x+1).val).toBe(null);
  expect(Maybe.of(1).map((x:number)=>x+1).map((x: number)=>x+1).val).toBe(3);
});

it('Either', ()=>{
  const parseJSON = (msg) => {
    try {
      return Right.of(JSON.parse(msg));
    } catch (err) {
      const e = err as Error;
      return Wrong.of(e.message);
    }
  };
  expect(parseJSON('{a:hello-world}')).toBeInstanceOf(Wrong);
  expect(parseJSON('{"a":"hello-world"}')).toBeInstanceOf(Right);
});