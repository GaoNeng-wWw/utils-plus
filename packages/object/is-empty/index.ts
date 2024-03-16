export function isEmptyObject<T extends Record<string, any>>(obj: T, strict: boolean = false){
  if (typeof obj === 'function' || !(obj instanceof Object)){
    // eslint-disable-next-line @typescript-eslint/ban-types
    const errMsg = `Parameter type should be object, but it is ${typeof obj}. ${typeof obj === 'function' ? `Do you want ${(obj as Function).name}.property or ${(obj as Function).name}.__proto__?` : ''}`;
    throw new Error(errMsg);
  }
  if (strict){
    return Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
  }
  return JSON.stringify(obj) === '{}';
}