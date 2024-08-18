let obj = {a: '111'}
Object.freeze(obj)
Object.isFrozen(obj) // 查看这个对象是否是冻结对象
/**
 * 在vue里面,如果把一个对象冻结,那么就不会变成响应式了,它内部处理了,排除冻结对象
 */