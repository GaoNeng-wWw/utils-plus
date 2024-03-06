import { Func } from '@utils-plus/type';
import {pipe} from '../pipe';

export class Container<T> {
  private val: T;
  get value(){
    return this.val;
  }
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

export class Maybe<T extends null | unknown>{
  private val: T;
  get value(){
    return this.val;
  }
  constructor(val:T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Maybe(val);
  }
  map<F extends Func>(f: F):T extends null ? Maybe<null> : Maybe<ReturnType<F>> {
    return this.val ? Maybe.of<ReturnType<F>>(f(this.val)) : Maybe.of<null>(null) as T extends null ? Maybe<null> : Maybe<ReturnType<F>>;
  }
}

export class Wrong<T> {
  private val: T;
  get value(){
    return this.val;
  }
  constructor(val: T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Wrong<T>(val);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<F extends Func>(fn: F){
    return this;
  }
}

export class Right<T> {
  private val: T;
  get value(){
    return this.val;
  }
  constructor(val: T){
    this.val = val;
  }
  static of<T>(val: T){
    return new Right(val);
  }
  map<F extends Func>(fn: F){
    return Right.of<ReturnType<F>>(fn(this.val));
  }
}

export class IO<
  F extends () => R,
  R = ReturnType<F>
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

export class Monad<T>{
  private val: T;
  constructor(val: T){
    this.val = val;
  }
  static of<T>(value: T){
    return new Monad(value);
  }
  map<F extends Func>(fn: F){
    return Monad.of<ReturnType<F>>(fn(this.val));
  }
  flatMap<F extends Func>(fn:F){
    return this.map(fn).join();
  }
  join(){
    return this.val;
  }
  get value(){
    return this.val;
  }
}