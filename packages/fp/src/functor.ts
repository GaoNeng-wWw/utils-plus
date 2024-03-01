import { Func } from '@utils-plus/type';
import pipe from './pipe';

export class Container<T> {
  public val: T;
  constructor(val: T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Container<T>(val);
  }
  map<F extends Func>(f: F){
    return Container.of<T>(f(this.val));
  }
}

export class Maybe<T>{
  public val: T;
  constructor(val:T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Maybe(val);
  }
  map<F extends Func>(f: F){
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null);
  }
}

export class Wrong<T> {
  public val: T;
  constructor(val: T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Wrong(val);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<F extends Func>(fn: F){
    return this;
  }
}

export class Right<T> {
  public val: T;
  constructor(val: T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Right(val);
  }
  map<F extends Func>(fn: F){
    return Right.of(fn(this.val));
  }
}

export class IO<
  R,
  F extends () => R
> {
  private val: F;
  constructor(val: F){
    this.val = val;
  }
  static of<T>(val: T){
    return new IO(() => val);
  }
  map<T extends unknown[], U>(f: (...args: T) => U){
    const composeFns = pipe(this.val, f);
    return new IO(composeFns);
  }

  get value(){
    return this.val();
  }
}