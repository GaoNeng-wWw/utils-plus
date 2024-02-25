const Pipe = <
  T extends readonly ((...args: any) => any)[],
  P=Parameters<T[0]>[number],
>(fns: T) => {
  return (...args: Parameters<T[0]>):P =>{
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