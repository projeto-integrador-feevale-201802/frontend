export const binder = x => {
  for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(x))) {
    if (typeof x[prop] === 'function') {
      x[prop] = x[prop].bind(x)
    }
  }
}
