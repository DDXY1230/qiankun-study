1. script标签就是一个宏任务
2. setTimeout是宏任务
3. promise.then微任务
4. queueMicrotask 微任务队列
```queueMicrotask(()=>{console.log('开启一个微任务队列')})```


```npm i -D nodemon```实时启动node运行脚本
