const extend = Object.assign;

const nodeOps = {
    // createElement, 不同的平台创建元素的方式不一样
    // 元素
    createElement: tagName => document.createElement(tagName),
    remove: child => {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    },
    insert: (child, parent, anchor = null) => {
        parent.insertBefore(child, anchor);
    },
    querySelector: selector => document.querySelector(selector),
    setElementText: (el, text) => el.textContent = text,
    //文本操作 
    createText: text => document.createTextNode(text),
    setText: (node, text) => node.nodeValue = text
};

const patchStyle = (el, prev, next) => {
    const style = el.style; // 获取样式
    if (next == null) {
        el.removeAttribute('style'); // 
    }
    else {
        // 老的里面新的有没有
        if (prev) {
            for (let key in prev) {
                if (next[key] == null) { // 老的有  新的没有  需要删除
                    style[key] = '';
                }
            }
        }
        // 新的里面需要赋值到style
        for (let key in next) {
            style[key] = next[key];
        }
    }
};

const patchEvent = (el, key, value) => {
    // 对函数的缓存
    const invokers = el.vei || (el._vei = {});
    const exists = invokers[key];
    if (value && exists) { // 需要绑定事件并且 新的事件value有值的情况下
        exists.value = value;
    }
    else { // 
        const eventName = key.slice(2).toLowerCase();
        if (value) {
            // 以前没有绑定过 要绑定事件
            let invoker = invokers[key] = createInvoker(value);
            el.addEventListener(eventName, invoker);
        }
        else { // 以前绑定了, 但是没有绑定值
            el.removeEventListener(eventName, exists);
            invokers[key] = undefined;
        }
    }
};
function createInvoker(value) {
    const invoker = e => {
        invoker.value(e);
    };
    invoker.value = value; // 为了能随时更改value属性
    return invoker;
}

const patchClass = (el, value) => {
    if (value == null) {
        value = '';
    }
    el.className = value;
};

const patchAttr = (el, key, value) => {
    if (value == null) {
        el.removeAttribute(key);
    }
    else {
        el.setAttribute(key);
    }
};

// 一系列的属性操作
const patchProp = (el, key, prevValue, nextValue) => {
    switch (key) {
        case 'class':
            patchClass(el, nextValue);
            break;
        case 'style':
            patchStyle(el, prevValue, nextValue);
            break;
        // case 'attr':
        //   break;
        // case 'events':
        //   break
        default:
            if (/^on[^a-z]/.test(key)) { // 事件
                patchEvent(el, key, nextValue);
            }
            else { // 属性
                patchAttr(el, key, nextValue);
            }
    }
};

const renderOption = extend({ patchProp }, nodeOps);

export { renderOption };
//# sourceMappingURL=runtime-dom.esm-bundler.js.map
