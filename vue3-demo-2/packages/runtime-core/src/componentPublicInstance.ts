import { hasOwn } from '@vue/shared';
export const PublicInstanceProxyHandlers = {
  get({_:instance},key) {
    console.log('render里面的proxy取值')
    const {setupState,props,data} = instance
    if(hasOwn(setupState,key)) {
      return setupState[key]
    }else if(hasOwn(props,key)) {
      return props[key]
    }else if(hasOwn(data,key)) {
      return data[key]
    }else {
      return undefined
    }
  },
  set({_:instance},key,value) {
    console.log('render里面的proxy设置值')

  }
}