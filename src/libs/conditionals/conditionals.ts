export const hasDuplicateProps = (obj1: {}, obj2: {}): boolean =>
  Object.keys(obj1).some(propName => obj2.hasOwnProperty(propName))
