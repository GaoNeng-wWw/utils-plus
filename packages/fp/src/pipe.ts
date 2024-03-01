type Fn = (...args: any[]) => any;
type LastReturnType<L extends Fn[]> = L extends [...any, infer Last extends Fn]
  ? ReturnType<Last>
  : never;
const pipe = <T extends Fn[]>(...fn: T)=>{
  return <U extends any[] = Parameters<T[0]>>(...args: U):LastReturnType<T> => {
    if (!fn.length){
      return args[0];
    }
    let _ = fn[0].call(undefined, ...args);
    for (let i=1;i<fn.length;i++){
      _ = fn[i](_);
    }
    return _;
  };
};

export default pipe;
