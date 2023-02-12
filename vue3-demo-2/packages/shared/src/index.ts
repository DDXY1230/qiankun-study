export const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
export const extend = Object.assign
export const isArray = Array.isArray
export const isFunction = value => typeof value == 'function'
export const isNumber = value => typeof value == 'number'
export const isString = value => typeof value == 'string'
export const isIntegerKey = key => parseInt(key) + '' === key

let hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (target, key) => hasOwnProperty.call(target, key)
export const hasChange = (oldValue, value) => oldValue !== value