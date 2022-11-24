// 纯属个人学习练习所用,学习大佬的代码逻辑.

var Vue = (function(exports){
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
    for(let i = 0; i < list.length; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
  }

  /* 
  dev only flag => name mapping
   */
  const PatchFlagNames = {
    [1/* TEXT */]: `TEXT`,
    [2/* CLASS */]: `CLASS`,
    [4/* STYLE */]: `STYLE`,
    [8/* PROPS */]: `PROPS`,
    [16/* FULL_PROPS */]: `PROPS`,
    [32/* HYDRATE_EVENTS */]: `HYDRATE_EVENTS`,
    [64/* STABLE_FRAGMENT */]: `STABLE_FRAGMENT`,
    [128/* KEYED_FRAGMENT */]: `KEYED_FRAGMENT`,
    [256/* UNKEYED_FRAGMENT */]: `UNKEYED_FRAGMENT`,
    [512/* NEED_PATCH */]: `NEED_PATCH`,
    [1024/* DYNAMIC_SLOTS */]: `DYNAMIC_SLOTS`,
    [2048/* DEV_ROOT_FRAGMENT */]: `DEV_ROOT_FRAGMENT`,
    [-1/* HOISTED */]: 'HOISTED',
    [-2/* BAIL */]: `BAIL`
  }

  /* DEV only */
  const slotFlagsText = {
    [1/* STABLE */]: `STABLE`,
    [2/* DYNAMIC */]: `DYNAMIC`,
    [3/* FORWARDED */]: `FORWARDED`
  }

  const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,'+
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
    let lines = source.split(/(\r?\n)/)//\r就是回到行首，\n就是到下一行的,前者使光标到行首，后者使光标下移一格
    // Separate the lines and newline sequences into sepqrate arrays for easier referencing
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_,idx) => idx % 2 === 0)
    let counter = 0;
    const res = []
    for(let i = 0; i < lines.length; i++) {
      count +=
      lines[i].length + ((newlineSequences[i] && newlineSequences[i].length) || 0);
      if(count >= start) {
        for(let j = i - range; j < i + range || end > count; j++){
          if(j < 0 || j >= lines.length)
          continue;
          const line = j + 1;
          res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}| ${lines[j]}`);
          const lineLength = line[j].length;
          const newLineSeqLength = (newlineSequences[j] && newlineSequences[j].length) || 0;
          if(j === i) {
            // push underline
            const pad = start - (count - (lineLength + newLineSeqLength));
            const length = Math.max(1, end > count ? lineLength - pad: end - start);
            res.push(` |  ` + ' '.repeat(pad) + '^'.repeat(length));
          }
          else if(j > i) {
            if(end > count) {
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
    if(isArray(value)) {
      const res = {}
      for(let i = 0; i < value.length; i++) {
        const item = value[i]
        const normalized = isString(item) ? 
        parseStringStyle(item)
        : normalizeStyle(item);
        if(normalized) {
          for(const key in normalized) {
            res[key] = normalized[key]
          }
        }
      }
      return res
    }
    else if(isString(value)) {
      return value
    }
    else if (isObject(value)) {
      return value
    }
  }
  // 类分割解析
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:(.+)/;
  function parseStringStyle(cssText) {
    const ret = {}
    cssText.split(listDelimiterRE).forEach(item => {
      if(item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tem[1].trim())
      }
    })
    return ret
  }
  function normalizeClass(value) {
    let res = ''
    if(isString(value)){
      res = value
    }
    else if(isArray(value)) {
      for(let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if(normalized) {
          res += normalized + ''
        }
      }
    }
    else if(isObject(value)) {
      for(const name in value) {
        if(value[name]) {
          res += name + ' '
        }
      }
    }
    return res.trim()
  }
  function normalizeProps(props) {
    if(!props) {
      return null
    }
    let {class: klass, style} = props;
    if(klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if(style){
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
  'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,'+
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

  function looseCompareArrays(a,b) {
    if(a.length !== b.length) {
      return false
    }
    let equal = true
    for(let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i],b[i])
    }
    return equal
  }
  function looseEqual(a,b) {
    if(a === b) {
      return true
    }
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if(aValidType || bValidType){
      return aValidType && bValidType ? a.getTime() === b.getTime() : false
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if(aValidType || bValidType) {
      return a === b
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if(aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a,b) : false
    }
    aValidTYpe = isObject(a)
    bValidType = isObject(b)
    if(aValidType || bValidType) {
      /* istanbul ignore if: this if will probably never be called */
      if(!aValidType || !bValidType) {
        return false
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if(aKeysCount !== bKeysCount) {
        return false;
      }
      for(const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key],b[key])){
          return false
        }
      }
    }
    return String(a) === String(b)
  }
  function looseIndexOf(arr,val) {
    return arr.findIndex(item => looseEqual(item,val))
  }
  /* 
  For converting {{interpolation}} values to displayed strings
   */

}({}))