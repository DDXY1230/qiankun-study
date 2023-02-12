'use strict';

const isObject = (value) => typeof value == 'object' && value !== null; // 判断是否是对象
const extend = Object.assign;
const isArray = Array.isArray;
const isFunction = value => typeof value == 'function';
const isNumber = value => typeof value == 'number';
const isString = value => typeof value == 'string';
const isIntegerKey = key => parseInt(key) + '' === key;
let hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);
const hasChange = (oldValue, value) => oldValue !== value;

exports.extend = extend;
exports.hasChange = hasChange;
exports.hasOwn = hasOwn;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isIntegerKey = isIntegerKey;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
//# sourceMappingURL=shared.cjs.js.map
