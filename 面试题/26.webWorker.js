/**
 * web worker的用法
 * 
 */
// 主组件
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
let worker;
startBtn.onclick = function() {
  worker = new Worker('worker.js')
  worker.onmessage = function(event) {
    console.log(event.data)
  }
}
stopBtn.onclick = function() {
  worker.terminate();
  worker = null
}
// worker.js
let i = 0;
function timeCount(){
  i++ 
  postMessage(i)
  setTimeout(timeCount, 1000)
}
// timeCount()
