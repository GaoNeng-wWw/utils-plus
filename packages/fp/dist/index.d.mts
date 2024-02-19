type FirstAsTuple<T extends any[]> = T extends [any, ...infer R] ? T extends [...infer F, ...R] ? F : never : never;
type Curry<A, R, D extends unknown[] = []> = A extends [unknown, ...infer T] ? T extends [] ? (...args: [...D, ...FirstAsTuple<A>]) => R : ((...args: [...D, ...FirstAsTuple<A>]) => Curry<T, R>) & Curry<T, R, [...D, ...FirstAsTuple<A>]> : () => R;

declare function curry<A extends unknown[], R>(fn: (...args: A) => R): Curry<A, R, []>;

export { curry };
