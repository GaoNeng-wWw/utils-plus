const Pipe = <
  T extends (...args: any) => any,
  P=Parameters<T>[number],
>(fns: T[]) => {
  return (...args: P[]):P =>{
    if (!fns.length){
      return args[0];
    }
    let _ = fns[0].apply(this, args);
    for (let i=1;i<fns.length;i++){
      _ = fns[i].call(this, _);
    }
    return _;
  };
};

export default Pipe;