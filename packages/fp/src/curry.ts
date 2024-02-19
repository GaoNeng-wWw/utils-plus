import { Curry } from '@utils-plus/type';

function curry<A extends unknown[], R>(fn: (...args:A) => R): Curry<A, R, []>{
  const curried = (...args: A): any => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return curry((fn as any).bind(null, ...args));
  };
    
  return curried as Curry<A, R, []>;
}

export default curry;