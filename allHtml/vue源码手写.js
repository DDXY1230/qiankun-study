// 纯属个人学习练习所用,学习大佬的代码逻辑.

var Vue = (function (exports) {
  'use strict';
  /* 
  Make a map and return a function for checking if a key
  is in that map.
  IMPORTANR: all calls of this function must be prefixed with
  \/\*#\_\_PURE\_\_*\/
  So that rollup can tree-shake them if necessary
   */
  function makeMap(str, expectsLowerCase) {
    const map = Object.create(null) // 创建一个没有原型的对象
    const list = str.split(',') // 将字符串以逗号分隔
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
  }

  /* 
  dev only flag => name mapping
   */
  const PatchFlagNames = {
    [1 /* TEXT */ ]: `TEXT`,
    [2 /* CLASS */ ]: `CLASS`,
    [4 /* STYLE */ ]: `STYLE`,
    [8 /* PROPS */ ]: `PROPS`,
    [16 /* FULL_PROPS */ ]: `PROPS`,
    [32 /* HYDRATE_EVENTS */ ]: `HYDRATE_EVENTS`,
    [64 /* STABLE_FRAGMENT */ ]: `STABLE_FRAGMENT`,
    [128 /* KEYED_FRAGMENT */ ]: `KEYED_FRAGMENT`,
    [256 /* UNKEYED_FRAGMENT */ ]: `UNKEYED_FRAGMENT`,
    [512 /* NEED_PATCH */ ]: `NEED_PATCH`,
    [1024 /* DYNAMIC_SLOTS */ ]: `DYNAMIC_SLOTS`,
    [2048 /* DEV_ROOT_FRAGMENT */ ]: `DEV_ROOT_FRAGMENT`,
    [-1 /* HOISTED */ ]: 'HOISTED',
    [-2 /* BAIL */ ]: `BAIL`
  }

  /* DEV only */
  const slotFlagsText = {
    [1 /* STABLE */ ]: `STABLE`,
    [2 /* DYNAMIC */ ]: `DYNAMIC`,
    [3 /* FORWARDED */ ]: `FORWARDED`
  }

  const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
    'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
    'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt';
  const isGloballyWhiteListed = /* #__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);

  const range = 2;

  function generateCodeFrame(source, start = 0, end = source.length) {
    /* 
    Split the content into individual lines but capture the newline sequence
    that separated each line.This is important because the actual sequence is
    needed to properly take into account the full line length for offset comparison
     */
    let lines = source.split(/(\r?\n)/) //\r就是回到行首，\n就是到下一行的,前者使光标到行首，后者使光标下移一格
    // Separate the lines and newline sequences into sepqrate arrays for easier referencing
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_, idx) => idx % 2 === 0)
    let counter = 0;
    const res = []
    for (let i = 0; i < lines.length; i++) {
      count +=
        lines[i].length + ((newlineSequences[i] && newlineSequences[i].length) || 0);
      if (count >= start) {
        for (let j = i - range; j < i + range || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}| ${lines[j]}`);
          const lineLength = line[j].length;
          const newLineSeqLength = (newlineSequences[j] && newlineSequences[j].length) || 0;
          if (j === i) {
            // push underline
            const pad = start - (count - (lineLength + newLineSeqLength));
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(` |  ` + ' '.repeat(pad) + '^'.repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(` | ` + '^'.repeat(length));
            }
            count += lineLength + newLineSeqLength;
          }
        }
        break
      }
    }
    return res.join('\n')
  }

  /* 
  On the client we only need to offer special cases for boolean attributes that
  have different names from their corresponding dom properties:
  itemscope => N/A
  allowfullscreen => allowFullscreen
  formnovalidate => formNoValidate
  ismap => isMap
  nomodule => noModule
  novalidate => noValidate
  readonly => readOnly
  
   */
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* #__PURE__ */ makeMap(specialBooleanAttrs)


  /* 
  
  Boolean attributes should be included if the value is truthy or ''
  e.g `<select multiple>` compiles to `{multiple: ''}`
   */
  function includeBooleanAttr(value) {
    return !!value || value === ''
  }

  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {}
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        const normalized = isString(item) ?
          parseStringStyle(item) :
          normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key]
          }
        }
      }
      return res
    } else if (isString(value)) {
      return value
    } else if (isObject(value)) {
      return value
    }
  }
  // 类分割解析
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;

  function parseStringStyle(cssText) {
    const ret = {}
    cssText.split(listDelimiterRE).forEach(item => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tem[1].trim())
      }
    })
    return ret
  }

  function normalizeClass(value) {
    let res = ''
    if (isString(value)) {
      res = value
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + ''
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + ' '
        }
      }
    }
    return res.trim()
  }

  function normalizeProps(props) {
    if (!props) {
      return null
    }
    let {
      class: klass,
      style
    } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (style) {
      props.style = normalizeStyle(style)
    }
    return props
  }
  // These tag config are shared between compile-dom and runtime-dom, so them
  // https://developer.mozilla.org/en-US/docs/web/HTML/Element
  const HTML_TAGS = 'html,body,base,head,meta,style,title,address,article,aside,footer,' +
    'header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,' +
    'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' +
    'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,' +
    'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' +
    'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' +
    'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' +
    'option,output,progress,select,textarea,details,dialog,menu,' +
    'summary,template,blockquote,iframe,tfoot'
  // https://developer.mozilla.org/en-US/docs/web/SVG/Element
  const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' +
    'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' +
    'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap' +
    'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' +
    'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' +
    'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' +
    'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' +
    'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' +
    'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' +
    'text,textPath,title,tspan,unknown,use,view';
  const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,params,source,track,wbr';
  /* 
  Compiler only.
  Do Not use in runtime code paths unless behind `true` flag
   */
  const isHTMLTag = /* #__PURE__ */ makeMap(HTML_TAGS)
  /* 
  Compiler only.
  Do Not use in runtime code paths unless behind `true` flag.
   */
  const isSVGTag = /* #__PURW__ */ makeMap(SVG_TAGS)
  /* 
  Compiler only.
  Do Not use in runtime code paths unless behind `true` flag.
   */
  const isVoidTag = /* #__PURE__ */ makeMap(VOID_TAGS)

  function looseCompareArrays(a, b) {
    if (a.length !== b.length) {
      return false
    }
    let equal = true
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i])
    }
    return equal
  }

  function looseEqual(a, b) {
    if (a === b) {
      return true
    }
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false
    }
    aValidTYpe = isObject(a)
    bValidType = isObject(b)
    if (aValidType || bValidType) {
      /* istanbul ignore if: this if will probably never be called */
      if (!aValidType || !bValidType) {
        return false
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if ((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key], b[key])) {
          return false
        }
      }
    }
    return String(a) === String(b)
  }

  function looseIndexOf(arr, val) {
    return arr.findIndex(item => looseEqual(item, val))
  }
  /* 
  For converting {{interpolation}} values to displayed strings
  *@private
   */
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? '' : isArray(val) || (isObject(val) &&
      (val.toString === objectToString || !isFunction(val.toString))) ? JSON.stringify(val, replacer, 2) : String(val)
  }
  const replacer = (_key, val) => {
    // can't use ifRef here since @vue/shared has no deps
    if (val && val.__v_isRef) {
      return replacer(__key, val.value)
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
          entries[`${key} =>`] = val;
          return entries
        }, {})
      }
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()]
      }
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val)
    }
    return val
  }
  const EMPTY_OBJ = Object.freeze({})
  const EMPTY_ARR = Object.freeze([])
  const NOOP = () => {}
  /* Always return false */
  const NO = () => false
  const onRE = /^on[^a-z]/
  const isOn = (key) => onRE.test(key)
  const isModelListener = (key) => key.startsWith('onUpdate:');
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el)
    if (i > -1) {
      arr.splice(i, 1)
    }
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === '[object Map]'
  const isSet = (val) => toTypeString(val) === '[object Set]'
  const isDate = (val) => toTypeString(val) === '[object Date]'
  const isFunction = (val) => typeof val === 'function'
  const isString = (val) = typeof val === 'string'
  const isSymbol = (val) => typeof val === 'symbol'
  const isObject = (val) => val !== null && typeof val === 'object'
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
  }
  const objectToString = Object.prototype.toString
  const toTypeString = (value) => objectToString.call(value)
  const toRawType = (value) => {
    //extract "RawType" from string like '[object RawType]'
    return toTypeString(value).slice(8, -1) // -1表示最后一个字符
  }
  const isPlainObject = (val) => toTypeString(val) === '[object Object]'
  const isIntegerKey = (key) => isString(key) && key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key
  const isPeservedProp = /* __PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ',key,ref,ref_for,ref_key,' +
    'onVnodeBeforeMount,onVnodeMounted,' +
    'onVnodeBeforeUpdate,onVnodeUpdated,' +
    'onVnodeBeforeUnmount,onBnodeUnmounted'
  )
  const isBuiltInDirective = /* __PURE__ */ makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo')
  const cacheStringFunction = (fn) => {
    const cache = Object.create(null)
    return ((str) => {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    })
  }
  const camelizeRE = /-(\w)/g //\w,与[a-zA-Z0-9_]等价，
  /* private */ // 驼峰命名转化为大写
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  })
  const hyphenateRE = /\B([A-Z])/g
  /* 
  private
   */
  const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase())
  /* private */
  const capitalize = cacheStringFunction(str.charAt(o).toUpperCase() + str.slice(1))
  /* private */
  const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : '')
  // compare whether a value has changed, accounting for NaN
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue)
  const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns(i)()
    }
  }
  const def = (obj, key, balue) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value
    })
  }
  const toNumber = (val) => {
    const n = parseFloat(val)
    return isNaN(n) ? val : n
  }
  let _globalThis;
  const getGlobalThis = () => {
    return (_globalThis || (_globalTHis = typeof globalThis !== 'undefined' ?
      globalThis :
      typeof self !== 'undefined' ?
      self :
      typeof window !== 'undefined' ?
      window :
      typeof global !== 'undefined' ?
      global : {}))
  }
  // 警告
  function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args)
  }
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      /* @internal */
      this.active = true;
      /* @internal */
      this.effects = []
      /* @internal */
      this.cleanups = []
      if (!detached && activeEffectScope) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1
      }
    }
    run(fn) {
      if (this.active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn()
        } finally {
          activeEffectScope = currentEffectScope
        }
      } else {
        warn(`cannot run an inactive effect scope`)
      }
    }
    /* This should only be called on non-detached scopes
    @internal
     */
    on() {
      activeEffectScope = this
    }
    /* 
    This should only be called on non-detached scopes
     */
    off() {
      activeEffectScope = this.parent
    }
    stop(fromParent) {
      if (this.active) {
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop()
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]()
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true)
          }
        }
        // nested scope, dereference from parent to avoid memory leaks
        if (this.parent && !fromParent) {
          // optimized O(1) removal
          const last = this.parent.scopes.pop()
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index
          }
        }
        this.active = false
      }
    }
  }

  function effectScope(detached) {
    return new EffectScope(detached)
  }

  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect)
    }
  }

  function getCurrentScope() {
    return activeEffectScope;
  }

  function onScopeDispose(fn) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn)
    } else {
      warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`)
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0
    dep.n = 0;
    return dep
  }
  const wastracked = (dep) => (dep.w & trackOpBit) > 0
  const newTracked = (dep) => (dep.n & trackOpBit) > 0
  const initDepMarkers = ({
    deps
  }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit // set was tracked  deps[i].w = deps[i].w | trackOpBit
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const {
      deps
    } = effect
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i]
        if (wastracked(dep) && !newTracked(dep)) {
          dep.delete(effect)
        } else {
          deps[ptr++] = dep
        }
        // clear bits
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit
      }
      deps.length = ptr
    }
  }
  const targetMap = new WeakMap()
  // The number of effects currently being tracked recursively
  let effectTrackDepth = 0
  let trackOpBit = 1
  /* 
  The bitwise track markers support at most 30 levers of recursion.
  This value is chosen to enable modern JS engines to use a SMI on all platform.
  When recursion depth is greater, fall back to using a full cleanup
   */
  const maxMarkerBits = 30
  let activeEffect
  const ITERATE_KEY = Symbol('iterate');
  const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate')
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = undefined
      recordEffectScope(this, scope)
    }
    run() {
      if (!this.active) {
        return this.fn()
      }
      let parent = activeEffect
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return
        }
        parent = parent.parent
      }
      try {
        this.parent = activeEffect;
        activeEffect = this
        shouldTrack = true
        trackOpBit = 1 << ++effectTrackDepth
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this)
        } else {
          return this.fn()
        }
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this)
        }
        trackOpBit = 1 << --effectTrackDepth
        activeEffect = this.parent
        shouldTrack = lastShouldTrack
        this.parent = undefined
        if (this.deferStop) {
          this.stop()
        }
      }
    }
    stop() {
      // stopped while running itself - defer the cleanup
      if (activeEffect === this) {
        this.deferStop = true
      } else if (this.active) {
        cleanupEffect(this)
        if (this.onStop) {
          this.onStop()
        }
        this.active = false
      }
    }
  }

  function cleanupEffect(effect) {
    const {
      deps
    } = effect
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect)
      }
      deps.length = 0
    }
  }

  function effect(fn, options) {
    if (fn.effect) {
      fn = fn.effect.fn
    }
    const _effect = new ReactiveEffect(fn)
    if (options) {
      extend(_effect, options);
      if (options.scope) {
        recordEffectScope(_effect, options.scope)
      }
    }
    if (!options || !options.lazy) {
      _effect.run()
    }
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
  }

  function stop(runner) {
    runner.effect.stop()
  }
  let shouldTrack = true
  const trackStack = []

  function pauseTracking() {
    trackStack.push(shouldTrack)
    shouldTrack = false
  }

  function resetTracking() {
    const last = trackStack.pop()
    shouldTrack = last === undefined ? true : last
  }

  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      let depsMap = targetMap.get(target)
      if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, (dep = createDep()))
      }
      const eventInfo = {effect: activeEffect, target, type, key}
      trackEffects(dep,eventInfo)
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack = false
    if(effectTrackDepth <= maxMarkerBits) {
      if(!newTracked(dep)){
        dep.n |= trackOpBit // set newly tracked
        shouldTrack = !wastracked(dep)
      }
    }
    else {
      // full cleanup mode
      shouldTrack = !dep.has(activeEffect)
    }
    if(shouldTrack) {
      dep.add(activeEffect)
      activeEffect.deps.push(dep)
      if(activeEffect.onTrack) {
        activeEffect.onTrack(Object.assign({effect: activeEffect}, debuggerEventExtraInfo));

      }
    }
  }
  function trigger(target, type, key, newValue, oldValue,oldTarget) {
    const depsMap = targetMap.get(target)
    if(!depsMap) {
      // never been tracked
      return
    }
    let deps = []
    if(type === 'clear' /* CLEAR */){
      // collection being cleared
      // trigger all effects for target
      deps = [...depsMap.values()]
    }
    else if(key === 'length' && isArray(target)) {
      depsMap.forEach((dep,key) => {
        if(key === 'length' || key >= newValue){
          deps.push(dep)
        }
      })
    }
    else {
      // schedule runs for SET | ADD | DELETE
      if(key !== void 0) {
        deps.push(depsMap.get(key));
      }
      // also run for iteration key on ADD | DELETE | Map.SET
      switch(type) {
        case 'add' /* ADD */:
        if(!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if(isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        else if(isIntegerKey(key)) {
          deps.push(depsMap.get('length'))
        }
        break;
        case 'delete'/* DELETE */:
          if(!isArray(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if(isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
            }
          }
          break;
        case 'set'/* SET */:
          if(isMap(target)){
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break
      }
    }
    const eventInfo = {target,type,key,newValue,oldValue, oldTarget}
    if(deps.length === 1) {
      if(deps[0]) {
        triggerEffects(deps[0], eventInfo)
      }
    }
    else {
      const effects = []
      for (const dep of deps) {
        if(dep) {
          effects.push(...dep)
        }
      }
      {
        triggerEffects(createDep(effects), eventInfo)
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    // spread into array for stabilization
    const effect = isArray(dep) ? dep : [...dep]
    for(const effect of effects) {
      if(effect.computed) {
        triggerEffect(effect,debuggerEventExtraInfo);
      }
    }
    for (const effect of effects) {
      if(!effect.computed) {
        triggerEffect(effect,debuggerEventExtraInfo)
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if(effect !== activeEffect || effect.allowRecurse) {
      if(effect.onTrigger) {
        effect.onTrigger(extend({effect}, debuggerEventExtraInfo))
      }
      if(effect.scheduler) {
        effect.scheduler()
      }
      else {
        effect.run()
      }
    }
  }
  const isNonTrackableKeys = /* __PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* #__PURE__ */
    Object.getOwnPropertyNames(Symbol)
    //ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 
    // 'caller'
    //but accessing them on Symbol leads to TypeError because Symbol is a strict mode
    // function
    .filter(key => key !== 'argument' && key !== 'caller')
    .map(key => Symbol[key])
    .filter(isSymbol)
  )
  const get = /* #__pure__ */ createGetter()
  const shallowGet = /* #__PURE__ */ createGetter(false, true)
  const readonlyGet = /* #__PURE__ */ createGetter(true)
  const shallowReadonlyGet = /* #__PURE__ */ createGetter(true, true)
  const arrayInstrumentations = /* __PURE__ */ createArrayInstrumentations()
  function createArrayInstrumentations() {
    const instrumentations = {}
    ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
      instrumentations[key] = function (...args) {
        const arr = toRaw(this)
        for(let i = 0, l = this.length; i<l;i++) {
          track(arr, 'get'/* GET */,i+'')
        }
        // we run the method using the original args first (which may be reactive)
        const res = arr[key](...args);
        if(res === -1 || res === false) {
          return arr[key](...args.map(toRaw))
        }
        else {
          return res
        }
      }
    })
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
      instrumentations[key] = function(...args) {
        pauseTracking()
        const res = toRaw(this)[key].apply(this,args)
        resetTracking()
        return res
      }
    })
    return instrumentations
  }
  function createGetter(isReadonly = false, shallow = false) {
    
  }
}({}))