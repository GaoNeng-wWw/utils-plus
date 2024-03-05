import { expect, expectTypeOf, it } from 'vitest';
import { Container, IO, Maybe, Monad, Right, Wrong } from '../src/functor';

it('IO', ()=>{
  expect(IO.of(1).map((x:number) => x+1).value).toBe(2);
  expect(IO.of(1).map((x:number) => x+1).map((x:number) => x+1).map((x:number) => x+1).value).toBe(4);
  expectTypeOf(IO.of(IO.of(1)).value).toEqualTypeOf<IO<()=>number, number>>();
  expectTypeOf(IO.of(IO.of(1)).value.value).toEqualTypeOf<number>();
  expect(IO.of(IO.of(1)).value.value).toBe(1);
});

it('Container', ()=>{
  expect(Container.of(1).map((x:number)=>x+1).map((x)=>x+1).val).toBe(3);
});

it('Maybe', ()=>{
  expect(Maybe.of(1).map(()=>null).map((x: number)=>x+1).val).toBe(null);
  expect(Maybe.of(1).map((x:number)=>x+1).map((x: number)=>x+1).val).toBe(3);
});

it('Either', ()=>{
  const parseJSON = (msg: string) => {
    try {
      return Right.of(JSON.parse(msg));
    } catch (err) {
      const e = err as Error;
      return Wrong.of(e.message);
    }
  };
  expect(parseJSON('{a:hello-world}')).toBeInstanceOf(Wrong);
  expect(parseJSON('{a:hello-world}').map(()=>{})).toBeInstanceOf(Wrong);
  expect(parseJSON('{"a":"hello-world"}').map((obj)=>{return obj.a;}).val).toBeTypeOf('string');
});

it('Monda', ()=>{
  expect(Monad.of(1).map((x:number) => Monad.of(x+1)).value).toBeInstanceOf(Monad);
  expect(Monad.of(1).flatMap((x:number) => Monad.of(x+1)).value).toBe(2);
});