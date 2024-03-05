import pipe from './pipe';
const compose = <T extends (...args:any[]) => any>(fns: T[]) => pipe(...fns.reverse());

export default compose;